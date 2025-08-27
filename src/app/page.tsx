import type { Game } from "@prisma/client";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const games = await api.games.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="w-full max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold">Games</h2>
          <table className="w-full overflow-hidden rounded-lg border border-white/20 text-white">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Genre</th>
                <th className="px-4 py-2 text-left">Platform</th>
                <th className="px-4 py-2 text-left">Release Date</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Multiplayer</th>
                <th className="px-4 py-2 text-left">Metascore</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game: Game) => (
                <tr key={game.id} className="border-t border-white/10">
                  <td className="px-4 py-2">{game.title}</td>
                  <td className="px-4 py-2">{game.genre ?? "-"}</td>
                  <td className="px-4 py-2">{game.platform ?? "-"}</td>
                  <td className="px-4 py-2">
                    {game.releaseDate?.toLocaleDateString() ?? "-"}
                  </td>
                  <td className="px-4 py-2">{game.price ?? "-"}</td>
                  <td className="px-4 py-2">
                    {game.multiplayer ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{game.metascore ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </HydrateClient>
  );
}
