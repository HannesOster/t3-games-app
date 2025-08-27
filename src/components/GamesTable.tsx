import type { Game } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function GamesTable({ games }: { games: Game[] }) {
  return (
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
        {games.map((game) => (
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
  );
}
