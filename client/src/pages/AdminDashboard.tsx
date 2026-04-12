import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useMemo } from "react";
import { DollarSign, Users, TrendingUp, Download, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const { data: donations = [], isLoading } = trpc.donations.list.useQuery();

  // Verificar se é admin
  if (!loading && (!user || user.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">
            Você não tem permissão para acessar este painel administrativo.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full">
            Voltar para Home
          </Button>
        </Card>
      </div>
    );
  }

  // Filtrar e ordenar doações
  const filteredDonations = useMemo(() => {
    let filtered = [...donations];

    if (filterMethod !== "all") {
      filtered = filtered.filter((d) => d.method === filterMethod);
    }

    if (sortBy === "amount") {
      filtered.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [donations, filterMethod, sortBy]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const total = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const average = donations.length > 0 ? total / donations.length : 0;
    const byMethod = donations.reduce(
      (acc, d) => {
        acc[d.method] = (acc[d.method] || 0) + parseFloat(d.amount);
        return acc;
      },
      {} as Record<string, number>
    );

    return { total, average, byMethod, count: donations.length };
  }, [donations]);

  // Dados para gráficos
  const methodChartData = Object.entries(stats.byMethod).map(([method, amount]) => ({
    name: method.charAt(0).toUpperCase() + method.slice(1),
    value: amount,
  }));

  const monthlyData = useMemo(() => {
    const monthlyMap: Record<string, number> = {};
    donations.forEach((d) => {
      const month = new Date(d.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
      monthlyMap[month] = (monthlyMap[month] || 0) + parseFloat(d.amount);
    });
    return Object.entries(monthlyMap)
      .map(([month, amount]) => ({ month, amount }))
      .slice(-6);
  }, [donations]);

  const COLORS = ["#10b981", "#f97316", "#3b82f6", "#8b5cf6"];

  const handleExportCSV = () => {
    const headers = ["Nome", "Email", "Valor", "Método", "Status", "Data"];
    const rows = filteredDonations.map((d) => [
      d.donorName,
      d.donorEmail,
      d.amount,
      d.method,
      d.status,
      new Date(d.createdAt).toLocaleDateString("pt-BR"),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `doacoes-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Arquivo exportado com sucesso!");
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-sm text-gray-600">Gerenciar doações e visualizar estatísticas</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total de Doações</p>
                <p className="text-3xl font-bold text-green-600">R$ {stats.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total de Doadores</p>
                <p className="text-3xl font-bold text-blue-600">{stats.count}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Doação Média</p>
                <p className="text-3xl font-bold text-orange-600">R$ {stats.average.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Este Mês</p>
                <p className="text-3xl font-bold text-purple-600">
                  R$ {(monthlyData[monthlyData.length - 1]?.amount || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Tendência Mensal */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tendência Mensal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Gráfico de Métodos de Pagamento */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Distribuição por Método</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={methodChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {methodChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Método</label>
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">Todos</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>
                  <option value="cartao">Cartão</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="date">Data (Recente)</option>
                  <option value="amount">Valor (Maior)</option>
                </select>
              </div>
            </div>

            <Button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar CSV
            </Button>
          </div>

          {/* Tabela de Doações */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Método</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-600">
                      Carregando...
                    </td>
                  </tr>
                ) : filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-600">
                      Nenhuma doação encontrada
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{donation.donorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donation.donorEmail}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        R$ {parseFloat(donation.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {donation.method.charAt(0).toUpperCase() + donation.method.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(donation.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredDonations.length} de {donations.length} doações
          </div>
        </Card>
      </main>
    </div>
  );
}
