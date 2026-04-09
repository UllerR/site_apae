import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContact } from "./db";
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
