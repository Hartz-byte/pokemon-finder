"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { fetchPokemonList, searchPokemon } from "@/lib/pokemonService";
import { PokemonListItem, PokemonListResponse } from "@/interfaces/pokemon";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import {
  SimpleGrid,
  Spinner,
  Center,
  Box,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

// HomeClientProps interface
interface HomeClientProps {
  initialPokemonList: PokemonListResponse;
}

export function HomeClient({ initialPokemonList }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>(
    initialPokemonList.results
  );
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(initialPokemonList.count);

  const LIMIT = 20;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // useEffect for searching with debouncing
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchTerm) {
        setIsLoading(true);
        setOffset(0);

        try {
          const results = await searchPokemon(debouncedSearchTerm);
          setPokemonList(results.results);
          setTotalCount(results.count);
          setHasMore(false);
        } catch (error) {
          console.error("Error searching Pokemon:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPokemonList(initialPokemonList.results);
        setOffset(initialPokemonList.results.length);
        setHasMore(
          initialPokemonList.results.length < initialPokemonList.count
        );
        setTotalCount(initialPokemonList.count);
      }
    };

    fetchData();
  }, [debouncedSearchTerm, initialPokemonList]);

  // handle search change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // load more pokemon
  const handleLoadMore = async () => {
    if (isLoadingMore || debouncedSearchTerm) return;

    setIsLoadingMore(true);

    try {
      const nextOffset = offset;
      const nextPage = await fetchPokemonList(LIMIT, nextOffset);

      setPokemonList((prevList) => [...prevList, ...nextPage.results]);
      setOffset(nextOffset + nextPage.results.length);
      setHasMore(offset + nextPage.results.length < totalCount);
    } catch (error) {
      console.error("Error loading more Pokemon:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      {/* search bar component */}
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      {/* pokemon count */}
      <Text mb={4} color="gray.600">
        Showing {pokemonList.length} of {totalCount} Pokémon
      </Text>

      {/* loading check */}
      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
      ) : pokemonList.length > 0 ? (
        <>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
            {pokemonList.map((pokemon) => (
              // pokemon card component
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </SimpleGrid>

          {/* load more button */}
          {!debouncedSearchTerm && hasMore && (
            <Flex justifyContent="center" mt={8} mb={4}>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleLoadMore}
                isLoading={isLoadingMore}
                loadingText="Loading more..."
              >
                Load More Pokémon
              </Button>
            </Flex>
          )}

          {/* loading more indicator */}
          {isLoadingMore && (
            <Center py={4}>
              <Spinner
                size="md"
                thickness="3px"
                speed="0.65s"
                color="blue.500"
              />
            </Center>
          )}
        </>
      ) : (
        <Box textAlign="center" py={10}>
          {/* fallback text */}
          <Text fontSize="xl">
            No Pokémon found matching &quot;{searchTerm}&quot;
          </Text>
        </Box>
      )}
    </>
  );
}
