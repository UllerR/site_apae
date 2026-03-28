import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * Página de Eventos - APAE de Itajaí
 * Design: Humanista Acessível
 * Cores: Verde esperança e Laranja acolhimento
 */

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  category: "atividade" | "workshop" | "evento" | "reuniao";
  capacity: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "Aula de Artes e Criatividade",
    date: new Date(2026, 3, 2),
    time: "09:00 - 11:00",
    location: "Sala de Artes - APAE",
    description: "Atividade de artes plásticas com foco no desenvolvimento criativo e motor.",
    category: "atividade",
    capacity: 20,
  },
  {
    id: 2,
    title: "Workshop de Música Terapêutica",
    date: new Date(2026, 3, 5),
    time: "14:00 - 15:30",
    location: "Auditório - APAE",
    description: "Sessão de musicoterapia com profissional especializado.",
    category: "workshop",
    capacity: 30,
  },
  {
    id: 3,
    title: "Reunião de Pais e Responsáveis",
    date: new Date(2026, 3, 8),
    time: "18:00 - 19:30",
    location: "Sala de Reuniões - APAE",
    description: "Encontro mensal para discutir progresso dos alunos e atividades futuras.",
    category: "reuniao",
    capacity: 50,
  },
  {
    id: 4,
    title: "Atividade de Educação Física",
    date: new Date(2026, 3, 10),
    time: "10:00 - 11:00",
    location: "Quadra - APAE",
    description: "Aula de educação física com atividades adaptadas e inclusivas.",
    category: "atividade",
    capacity: 25,
  },
  {
    id: 5,
    title: "Festa de Inclusão Social",
    date: new Date(2026, 3, 15),
    time: "15:00 - 18:00",
    location: "Pátio - APAE",
    description: "Grande evento com atividades recreativas, música, comida e diversão para toda a comunidade.",
    category: "evento",
    capacity: 100,
  },
  {
    id: 6,
    title: "Sessão de Fonoaudiologia em Grupo",
    date: new Date(2026, 3, 18),
    time: "13:00 - 14:00",
    location: "Sala de Fonoaudiologia - APAE",
    description: "Atividade em grupo para desenvolvimento de fala e linguagem.",
    category: "atividade",
    capacity: 15,
  },
  {
    id: 7,
    title: "Workshop para Famílias",
    date: new Date(2026, 3, 22),
    time: "19:00 - 20:30",
    location: "Auditório - APAE",
    description: "Palestra com especialista sobre inclusão social e desenvolvimento integral.",
    category: "workshop",
    capacity: 60,
  },
  {
    id: 8,
    title: "Passeio Educativo",
    date: new Date(2026, 3, 25),
    time: "08:00 - 12:00",
    location: "Saída da APAE",
    description: "Passeio a um local educativo com atividades práticas e inclusivas.",
    category: "evento",
    capacity: 40,
  },
];

export default function Events() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "atividade":
        return "bg-green-100 text-green-700";
      case "workshop":
        return "bg-blue-100 text-blue-700";
      case "evento":
        return "bg-orange-100 text-orange-700";
      case "reuniao":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "atividade":
        return "Atividade";
      case "workshop":
        return "Workshop";
      case "evento":
        return "Evento";
      case "reuniao":
        return "Reunião";
      default:
        return category;
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">APAE Itajaí</h1>
              <p className="text-xs text-gray-600">Associação de Pais e Amigos dos Excepcionais</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="/" className="text-gray-700 hover:text-green-600 font-medium transition">Início</a>
            <a href="/#sobre" className="text-gray-700 hover:text-green-600 font-medium transition">Sobre</a>
            <a href="/#servicos" className="text-gray-700 hover:text-green-600 font-medium transition">Serviços</a>
            <a href="/events" className="text-green-600 font-bold transition">Eventos</a>
            <a href="/donation" className="text-gray-700 hover:text-green-600 font-medium transition">Doação</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Próximas Atividades
              </h1>
              <p className="text-xl leading-relaxed">
                Confira o calendário de eventos, atividades educacionais, workshops e reuniões da APAE de Itajaí. Participe e faça parte de nossa comunidade inclusiva!
              </p>
            </div>
          </div>
        </section>

        {/* Calendário e Eventos */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Calendário */}
              <div className="md:col-span-1">
                <Card className="p-6 border-2 border-green-200 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendário</h2>

                  {/* Navegação de Mês */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={previousMonth}
                      className="p-2 hover:bg-gray-100 rounded transition"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h3 className="text-lg font-bold text-gray-800 capitalize">{monthName}</h3>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-gray-100 rounded transition"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Dias da Semana */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                      <div key={day} className="text-center font-bold text-sm text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Dias do Mês */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((date, index) => {
                      const hasEvents = date && getEventsForDate(date).length > 0;
                      const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();

                      return (
                        <button
                          key={index}
                          onClick={() => date && setSelectedDate(date)}
                          className={`p-2 text-sm font-semibold rounded transition ${
                            !date
                              ? "text-gray-300"
                              : isSelected
                              ? "bg-green-600 text-white"
                              : hasEvents
                              ? "bg-orange-200 text-orange-700 hover:bg-orange-300"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {date?.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-gray-600 mt-6 text-center">
                    Clique em um dia para ver os eventos
                  </p>
                </Card>
              </div>

              {/* Lista de Eventos */}
              <div className="md:col-span-2">
                {selectedDate ? (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                      Eventos de {selectedDate.toLocaleDateString("pt-BR")}
                    </h2>

                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-6">
                        {selectedDateEvents.map((event) => (
                          <Card key={event.id} className="p-8 border-2 border-gray-200 hover:shadow-lg transition">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl font-bold text-gray-800 flex-1">{event.title}</h3>
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                                {getCategoryLabel(event.category)}
                              </span>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-gray-700">
                                <Clock className="w-5 h-5 text-green-600" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-3 text-gray-700">
                                <MapPin className="w-5 h-5 text-green-600" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-3 text-gray-700">
                                <Users className="w-5 h-5 text-green-600" />
                                <span>Capacidade: {event.capacity} pessoas</span>
                              </div>
                            </div>

                            <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white w-full">
                              Confirmar Presença
                            </Button>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 border-2 border-gray-200 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">Nenhum evento agendado para este dia.</p>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Próximos Eventos</h2>
                    <div className="space-y-6">
                      {events.slice(0, 5).map((event) => (
                        <Card key={event.id} className="p-8 border-2 border-gray-200 hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedDate(event.date)}>
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800 flex-1">{event.title}</h3>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                              {getCategoryLabel(event.category)}
                            </span>
                          </div>

                          <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

                          <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="w-5 h-5 text-green-600" />
                              <span>{event.date.toLocaleDateString("pt-BR")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-5 h-5 text-green-600" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-5 h-5 text-green-600" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
              Tipos de Eventos
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="p-8 text-center border-2 border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Atividades</h3>
                <p className="text-gray-700">Aulas e atividades educacionais e terapêuticas.</p>
              </Card>

              <Card className="p-8 text-center border-2 border-blue-200">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Workshops</h3>
                <p className="text-gray-700">Palestras e oficinas com especialistas.</p>
              </Card>

              <Card className="p-8 text-center border-2 border-orange-200">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Eventos</h3>
                <p className="text-gray-700">Festas, passeios e atividades comunitárias.</p>
              </Card>

              <Card className="p-8 text-center border-2 border-purple-200">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Reuniões</h3>
                <p className="text-gray-700">Encontros com pais e responsáveis.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Quer Participar?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Todos são bem-vindos! Entre em contato conosco para se inscrever em qualquer atividade.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold">
                Entrar em Contato
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-bold">
                Ver Mais Eventos
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-500">APAE Itajaí</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Transformando vidas através da inclusão e educação especializada há mais de 50 anos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contato</h3>
              <div className="space-y-2 text-gray-400">
                <p>Av. Joca Brandão, 537 - Centro</p>
                <p>Itajaí - SC, 88301-441</p>
                <p>(47) 3348-8813</p>
                <p>apae.itj@terra.com.br</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Links Rápidos</h3>
              <div className="space-y-2">
                <a href="/" className="text-gray-400 hover:text-orange-500 transition block">Início</a>
                <a href="/#sobre" className="text-gray-400 hover:text-orange-500 transition block">Sobre</a>
                <a href="/#servicos" className="text-gray-400 hover:text-orange-500 transition block">Serviços</a>
                <a href="/events" className="text-gray-400 hover:text-orange-500 transition block">Eventos</a>
                <a href="/donation" className="text-gray-400 hover:text-orange-500 transition block">Doação</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-center text-sm">
              © 2026 APAE de Itajaí. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Importar BookOpen do lucide-react se não estiver disponível
import { BookOpen } from "lucide-react";
