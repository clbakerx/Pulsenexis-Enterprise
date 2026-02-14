import PacksView from "./PacksView";

type Genre = "jazz" | "rnb" | "soul";

function toGenre(v?: string): Genre | undefined {
  const g = (v ?? "").toLowerCase();
  if (g === "jazz" || g === "rnb" || g === "soul") return g;
  return undefined;
}

export default function PacksPage({
  searchParams,
}: {
  searchParams?: { genre?: string };
}) {
  const genre = toGenre(searchParams?.genre);
  return <PacksView genre={genre} />;
}
