import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { RouterOutputs } from "~/trpc/react";

export function GamesTable({
  games,
}: {
  games: RouterOutputs["games"]["getPaginated"]["games"];
}) {
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
          <TableHead>Developer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell>{game.title}</TableCell>
            <TableCell>{game.genre}</TableCell>
            <TableCell>{game.platform}</TableCell>
            <TableCell>{game.releaseDate?.toLocaleDateString()}</TableCell>
            <TableCell>{game.price}</TableCell>
            <TableCell>{game.multiplayer ? "Yes" : "No"}</TableCell>
            <TableCell>{game.metascore}</TableCell>
            <TableCell>{game.developer.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
