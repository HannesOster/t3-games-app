import { GamesTable } from "~/components/GamesTable";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
  const games = await api.games.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="w-full max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold">Games</h2>
          <GamesTable games={games} />
        </div>
      </main>
    </HydrateClient>
  );
}
