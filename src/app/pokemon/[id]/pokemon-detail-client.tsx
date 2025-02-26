"use client";

import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  Progress,
  Divider,
} from "@chakra-ui/react";

import { PokemonDetail } from "@/interfaces/pokemon";

interface PokemonDetailClientProps {
  pokemon: PokemonDetail;
}

// Map of Pokemon types to colors
const typeColors: Record<string, string> = {
  normal: "gray",
  fire: "red",
  water: "blue",
  electric: "yellow",
  grass: "green",
  ice: "cyan",
  fighting: "orange",
  poison: "purple",
  ground: "orange",
  flying: "blue",
  psychic: "pink",
  bug: "green",
  rock: "gray",
  ghost: "purple",
  dragon: "purple",
  dark: "gray",
  steel: "gray",
  fairy: "pink",
};

export function PokemonDetailClient({ pokemon }: PokemonDetailClientProps) {
  const formatStatName = (name: string): string => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
      default:
        return name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }
  };

  return (
    <>
      <Link href="/" passHref>
        <Button
          leftIcon={<ArrowBackIcon />}
          mb={6}
          colorScheme="blue"
          variant="outline"
        >
          Back to List
        </Button>
      </Link>

      <Box
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        bgGradient="linear(to-b, blue.50, white)"
        mb={6}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex direction="column" align="center" justify="center">
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              width={300}
              height={300}
              onError={(e) => {
                e.currentTarget.src = "/pokeball.png";
              }}
            />
          </Flex>

          <Box>
            <Flex align="baseline" mb={2}>
              <Heading as="h1" size="2xl" textTransform="capitalize" mr={2}>
                {pokemon.name}
              </Heading>
              <Text color="gray.500" fontSize="2xl">
                #{pokemon.id.toString().padStart(3, "0")}
              </Text>
            </Flex>

            <Box mb={6}>
              <Text fontWeight="bold" mb={2}>
                Type
              </Text>
              <Flex>
                {pokemon.types.map(({ type }) => (
                  <Badge
                    key={type.name}
                    colorScheme={typeColors[type.name] || "gray"}
                    mr={2}
                    px={3}
                    py={1}
                    borderRadius="full"
                    textTransform="capitalize"
                  >
                    {type.name}
                  </Badge>
                ))}
              </Flex>
            </Box>

            <SimpleGrid columns={2} spacing={4} mb={6}>
              <Stat>
                <StatLabel>Height</StatLabel>
                <StatNumber>{pokemon.height / 10} m</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Weight</StatLabel>
                <StatNumber>{pokemon.weight / 10} kg</StatNumber>
              </Stat>
            </SimpleGrid>

            <Box>
              <Text fontWeight="bold" mb={2}>
                Abilities
              </Text>
              <Flex flexWrap="wrap">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <Badge
                    key={ability.name}
                    mr={2}
                    mb={2}
                    px={3}
                    py={1}
                    borderRadius="full"
                    colorScheme={is_hidden ? "purple" : "blue"}
                    textTransform="capitalize"
                  >
                    {ability.name.replace("-", " ")}
                    {is_hidden && " (Hidden)"}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

      <Tabs colorScheme="blue" isLazy>
        <TabList>
          <Tab>Stats</Tab>
          <Tab>Moves</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box p={4} borderRadius="md" borderWidth="1px">
              {pokemon.stats.map(({ base_stat, stat }) => (
                <Box key={stat.name} mb={4}>
                  <Flex justify="space-between" mb={1}>
                    <Text fontWeight="medium">{formatStatName(stat.name)}</Text>
                    <Text fontWeight="bold">{base_stat}</Text>
                  </Flex>
                  <Progress
                    value={base_stat}
                    max={255}
                    colorScheme={
                      base_stat > 100
                        ? "green"
                        : base_stat > 50
                        ? "blue"
                        : "orange"
                    }
                    borderRadius="full"
                    size="sm"
                  />
                </Box>
              ))}
            </Box>
          </TabPanel>

          <TabPanel>
            <Box p={4} borderRadius="md" borderWidth="1px">
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                {pokemon.moves.slice(0, 20).map(({ move }) => (
                  <Badge
                    key={move.name}
                    p={2}
                    borderRadius="md"
                    textTransform="capitalize"
                    textAlign="center"
                    bg="gray.100"
                  >
                    {move.name.replace("-", " ")}
                  </Badge>
                ))}
              </SimpleGrid>

              {pokemon.moves.length > 20 && (
                <>
                  <Divider my={4} />
                  <Text color="gray.500" textAlign="center">
                    + {pokemon.moves.length - 20} more moves
                  </Text>
                </>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
