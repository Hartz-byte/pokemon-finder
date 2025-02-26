import { PokemonDetail, PokemonListResponse } from "@/interfaces/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

// function to add delay between requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// retry logic for fetching
async function fetchWithRetry(url: string, retries = 3, backoff = 300) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed. Retrying in ${backoff}ms...`);
      lastError = error;
      await delay(backoff);
      backoff *= 2;
    }
  }

  throw lastError;
}

// fetch pokemon list function
export const fetchPokemonList = async (
  limit = 24,
  offset = 0
): Promise<PokemonListResponse> => {
  const response = await fetchWithRetry(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  return response.json();
};

// search pokemon function
export const searchPokemon = async (
  name: string
): Promise<PokemonListResponse> => {
  const response = await fetchWithRetry(`${API_URL}/pokemon?limit=500`);

  const data: PokemonListResponse = await response.json();

  // filter results by name
  const filteredResults = data.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );

  return {
    ...data,
    results: filteredResults,
  };
};

// fetch pokemon detail function
export const fetchPokemonDetail = async (
  idOrName: string | number
): Promise<PokemonDetail> => {
  const response = await fetchWithRetry(`${API_URL}/pokemon/${idOrName}`);

  return response.json();
};

// fetch pokemon image function
export const getImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// get pokemon id from url
export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
};
