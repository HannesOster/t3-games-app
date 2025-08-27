"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { GamesTable } from "~/components/GamesTable";
import { PaginationControls } from "~/components/PaginationControls";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = api.games.getPaginated.useQuery({ page });

  if (isLoading) {
    return <div className="text-white">Loading…</div>;
  }

  if (!data) {
    return <div className="text-white">No data found.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="w-full px-3">
        <h2 className="mb-4 text-3xl font-bold">Games</h2>

        <GamesTable games={data.games} />

        <PaginationControls
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
