import PacksView from "./PacksView";

export default function PacksPage({
  searchParams,
}: {
  searchParams?: { genre?: string };
}) {
  const genre = (searchParams?.genre ?? "").toLowerCase();
  return <PacksView genre={genre} />;
}
