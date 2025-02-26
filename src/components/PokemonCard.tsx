"use client";

import Link from "next/link";
import React from "react";

import { Box, Image, Text, Badge, Flex } from "@chakra-ui/react";
import { getPokemonIdFromUrl, getImageUrl } from "@/lib/pokemonService";

// PokemonCardProps interface
interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const id = getPokemonIdFromUrl(url);
  const imageUrl = getImageUrl(id);

  // function to get color based on pokemon id for visual variety
  const getBackgroundColor = (id: number) => {
    const colors = [
      "blue.50",
      "teal.50",
      "green.50",
      "red.50",
      "purple.50",
      "yellow.50",
      "orange.50",
    ];

    return colors[id % colors.length];
  };

  return (
    <Link href={`/pokemon/${id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={getBackgroundColor(id)}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)", shadow: "md" }}
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <Box p={4} display="flex" justifyContent="center">
          <Image
            src={imageUrl}
            alt={name}
            width={120}
            height={120}
            onError={(e) => {
              e.currentTarget.src = "/pokeball.png";
            }}
          />
        </Box>

        <Box p={4} pt={0}>
          <Flex align="center" justify="space-between">
            <Text
              fontWeight="semibold"
              textTransform="capitalize"
              fontSize="lg"
            >
              {name}
            </Text>
            <Badge colorScheme="blue" borderRadius="full" px={2}>
              #{id}
            </Badge>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default PokemonCard;
