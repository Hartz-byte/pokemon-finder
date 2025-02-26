import { fetchPokemonDetail } from "@/lib/pokemonService";
import Layout from "@/components/Layout";
import { PokemonDetailClient } from "./pokemon-detail-client";
import { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pokemon = await fetchPokemonDetail(params.id);
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return {
    title: `Pokemon - ${name}`,
    description: `View details about ${name} - a Pokemon with ${pokemon.types
      .map((t) => t.type.name)
      .join(" and ")} type.`,
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const pokemon = await fetchPokemonDetail(params.id);

  return (
    <Layout>
      <PokemonDetailClient pokemon={pokemon} />
    </Layout>
  );
}
