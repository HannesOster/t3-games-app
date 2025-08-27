import type { Game } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const gamesRouter = createTRPCRouter({
  getPaginated: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100).optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, title } = input;

      const [games, total] = await Promise.all([
        ctx.db.game.findMany({
          where: {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          include: {
            developer: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.db.game.count(),
      ]);

      return {
        games,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        genre: z.enum([
          "RPG",
          "Shooter",
          "Action",
          "Adventure",
          "Simulation",
          "Puzzle",
        ]),
        platform: z.string().min(1).max(50),
        releaseDate: z.coerce.date(),
        developerName: z.string(),
        price: z.number().min(0),
        multiplayer: z.boolean(),
        metascore: z.number().int().min(0).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.game.create({
        data: {
          title: input.title,
          genre: input.genre,
          platform: input.platform,
          releaseDate: input.releaseDate,
          price: input.price,
          multiplayer: input.multiplayer,
          metascore: input.metascore,
          developer: {
            connectOrCreate: {
              where: { name: input.developerName },
              create: { name: input.developerName },
            },
          },
        },
      });
    }),
});
