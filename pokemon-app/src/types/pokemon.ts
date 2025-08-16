export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    height: number;
    weight: number;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
}

export interface PokemonListResponse {
    results: Pokemon[];
    count: number;
    next: string | null;
    previous: string | null;
}

// Add this to your pokemon.ts types file
export interface EvolutionChain {
    id: number;
    baby_trigger_item: null | {
        name: string;
        url: string;
    };
    chain: ChainLink;
}

export interface ChainLink {
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
    evolution_details: EvolutionDetail[] | [];
    evolves_to: ChainLink[]; // Recursive structure for evolution stages
}

interface EvolutionDetail {
    item: null | { name: string; url: string };
    trigger: { name: string; url: string };
    gender: number | null;
    held_item: null | { name: string; url: string };
    known_move: null | { name: string; url: string };
    known_move_type: null | { name: string; url: string };
    location: null | { name: string; url: string };
    min_level: number | null;
    min_happiness: number | null;
    min_beauty: number | null;
    min_affection: number | null;
    needs_overworld_rain: boolean;
    party_species: null | { name: string; url: string };
    party_type: null | { name: string; url: string };
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: null | { name: string; url: string };
    turn_upside_down: boolean;
}