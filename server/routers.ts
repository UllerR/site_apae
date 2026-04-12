import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createContact, createDonation, getAllDonations } from "./db";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  donations: router({
    list: protectedProcedure
      .query(async () => {
        try {
          const donations = await getAllDonations();
          return donations;
        } catch (error) {
          console.error("[Donations] Error fetching donations:", error);
          throw new Error("Falha ao carregar doações");
        }
      }),
    create: publicProcedure
      .input(
        z.object({
          donorName: z.string().min(1),
          donorEmail: z.string().email(),
          amount: z.string(),
          method: z.enum(["pix", "transferencia", "cartao", "outro"]),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createDonation({
            donorName: input.donorName,
            donorEmail: input.donorEmail,
            amount: input.amount,
            currency: "BRL",
            method: input.method,
            status: "confirmada",
            message: input.message || null,
            isRecurring: false,
          });

          await notifyOwner({
            title: `Nova Doacao Confirmada: R$ ${input.amount}`,
            content: `Doador: ${input.donorName}\nEmail: ${input.donorEmail}\nValor: R$ ${input.amount}\nMetodo: ${input.method}`,
          });

          return {
            success: true,
            message: "Doacao registrada com sucesso!",
          };
        } catch (error) {
          console.error("[Donation] Error creating donation:", error);
          throw new Error("Falha ao registrar doacao");
        }
      }),
  }),

  contacts: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(10),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createContact({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            subject: input.subject,
            message: input.message,
            status: "novo",
          });

          // Enviar notificação para o proprietário da APAE
          const emailContent = `Novo contato de parceiro recebido!\n\nNome: ${input.name}\nEmail: ${input.email}\nTelefone: ${input.phone || "Não informado"}\nTipo de Interesse: ${input.subject}\n\nMensagem:\n${input.message}`;

          await notifyOwner({
            title: `Novo Parceiro: ${input.subject}`,
            content: emailContent,
          });

          return {
            success: true,
            message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
          };
        } catch (error) {
          console.error("Erro ao criar contato:", error);
          throw new Error("Erro ao enviar mensagem. Tente novamente.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
