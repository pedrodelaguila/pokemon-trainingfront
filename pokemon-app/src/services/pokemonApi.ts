// src/services/pokemonApi.ts
import axios from 'axios';
import type {EvolutionChain, PokemonDetails} from '../types/pokemon';

// Reusable API functions
export const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
    const response = await axios.get<PokemonDetails>(url);
    return response.data;
};

export const fetchPokemonByName = async (name: string): Promise<PokemonDetails> => {
    const response = await axios.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
};

export interface PokemonSpecies {
    habitat?: { name: string };
    is_legendary?: boolean;
    is_mythical?: boolean;
    color?: { name: string };
    flavor_text_entries?: Array<{
        flavor_text: string;
        language: { name: string };
    }>;
    evolution_chain: {
        url: string;
    };
}

export const fetchPokemonSpecies = async (pokemonId: number): Promise<PokemonSpecies> => {
    const response = await axios.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    return response.data;
};

export const fetchEvolutionChain = async (speciesData: PokemonSpecies): Promise<EvolutionChain> => {
    // Extract the ID from the evolution_chain URL
    const urlParts = speciesData.evolution_chain.url.split('/');
    const evolutionId = urlParts[urlParts.length - 2];

    const response = await axios.get<EvolutionChain>(
        `https://pokeapi.co/api/v2/evolution-chain/${evolutionId}/`
    );
    return response.data;
};