import { fetchPokemonList } from "@/lib/pokemonService";
import { Box, Heading, Text } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { HomeClient } from "./home-client";

export default async function Home() {
  // fetch pokemon list
  const initialPokemonList = await fetchPokemonList(20, 0);

  return (
    <Layout>
      <Box mb={6}>
        <Heading as="h2" size="xl" mb={2}>
          Explore Pokémon
        </Heading>
        <Text color="gray.600">
          Search and discover Pokémon from the Pokémon world
        </Text>
      </Box>

      <HomeClient initialPokemonList={initialPokemonList} />
    </Layout>
  );
}
