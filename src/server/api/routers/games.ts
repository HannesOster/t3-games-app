import type { Game } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gamesRouter = createTRPCRouter({
  getAll: publicProcedure.query(
    async ({
      ctx,
    }: {
      ctx: { db: { game: { findMany: (args: object) => Promise<Game[]> } } };
    }) => {
      return ctx.db.game.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
  ),
});
