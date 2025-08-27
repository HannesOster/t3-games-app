"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { api } from "~/trpc/react";
import { GamesTable } from "~/components/GamesTable";
import { PaginationControls } from "~/components/PaginationControls";
import { Input } from "~/components/ui/input";
import { useDebouncedValue } from "~/lib/useDebouncedValue";

export default function Home() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [title, setTitle] = useQueryState("title", {
    defaultValue: "",
    history: "replace",
  });

  const debouncedTitle = useDebouncedValue(title, 300);

  const { data, isLoading } = api.games.getPaginated.useQuery({
    page,
    title: debouncedTitle || undefined,
  });

  return (
    <main className="flex min-h-screen flex-col justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8 text-white">
      <h2 className="mb-4 text-3xl font-bold">Games</h2>

      <Input
        value={title}
        onChange={(e) => {
          void setPage(1);
          void setTitle(e.target.value);
        }}
        placeholder="Search by title…"
        className="mb-4 w-full bg-white text-black"
      />

      {isLoading ? (
        <div className="text-white">Loading…</div>
      ) : data && data.games.length > 0 ? (
        <>
          <GamesTable games={data.games} />

          <PaginationControls
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="text-white">No data found.</div>
      )}
    </main>
  );
}
