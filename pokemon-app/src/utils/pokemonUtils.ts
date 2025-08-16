// src/utils/pokemonUtils.ts
export const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
        fire: '#ff6b6b',
        water: '#74c0fc',
        grass: '#51cf66',
        electric: '#ffd43b',
        psychic: '#f783ac',
        ice: '#91a7ff',
        dragon: '#845ec2',
        dark: '#6c757d',
        fairy: '#f8bbd9',
        poison: '#9775fa',
        ground: '#d2691e',
        flying: '#87ceeb',
        fighting: '#c92a2a',
        rock: '#8d6e63',
        bug: '#4caf50',
        ghost: '#6f42c1',
        steel: '#868e96',
        normal: '#adb5bd'
    };
    return colors[type] || '#6c757d';
};

export const getTypeIcon = (type: string): string => {
    return `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type}.png`;
};

export const getPokemonAnimatedGif = (pokemonId: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;
};