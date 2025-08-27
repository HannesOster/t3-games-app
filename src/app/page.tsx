import type { Game } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const games = await api.games.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="w-full max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold">Games</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Multiplayer</TableHead>
                <TableHead>Metascore</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game: Game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.title}</TableCell>
                  <TableCell>{game.genre ?? "-"}</TableCell>
                  <TableCell>{game.platform ?? "-"}</TableCell>
                  <TableCell>
                    {game.releaseDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                  <TableCell>{game.price ?? "-"}</TableCell>
                  <TableCell>{game.multiplayer ? "Yes" : "No"}</TableCell>
                  <TableCell>{game.metascore ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </HydrateClient>
  );
}
