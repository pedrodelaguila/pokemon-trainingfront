import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import type {PokemonDetails} from '../../types/pokemon';
import './PokemonCard.css';
import { getTypeColor, getTypeIcon, getPokemonAnimatedGif } from '../../utils/pokemonUtils';


// Styled Components
const CardContainer = styled.div.attrs({
    className: 'card-container',
})`
`;

export const PokemonImage = styled.img.attrs({
    className: 'pokemon-image'
})`
`;

export const PokemonName = styled.h3.attrs({
    className: 'pokemon-name'
})`
`;

const StatContainer = styled.div.attrs({
    className: 'space-y-2 text-sm'
})``;

const StatRow = styled.div.attrs({
    className: 'stat-row'
})``;

const StatLabel = styled.span.attrs({
    className: 'stat-label'
})``;

const TypeBadge = ({ type, children }: { type: string, children: React.ReactNode }) => (
    <span
        className="type-badge"
        style={{ backgroundColor: getTypeColor(type) }}
    >
    {children}
  </span>
);

const StatTypeLabel = styled.span.attrs({
    className: 'stat-type-label'
})``;

const ResultLabel = styled.span.attrs({
    className: 'result-label'
})``;
const AbilityBadge = styled.span.attrs({
    className: 'ability-badge'
})``;

const LoadingCard = styled.div.attrs({
    className: 'bg-white rounded-lg shadow-md p-4 border border-gray-200 animate-pulse'
})``;

const LoadingElement = styled.div.attrs({
    className: 'bg-gray-200 rounded'
})``;


const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
    const response = await axios.get<PokemonDetails>(url);
    return response.data;
};

const ClickableCard = styled(CardContainer)`
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.06);
        transform: translateY(-8px);
    }
`;

// Define the species interface to replace "any"
interface PokemonSpecies {
    habitat?: { name: string };
    is_legendary?: boolean;
    is_mythical?: boolean;
    color?: { name: string };
}

// Update the function with the proper return type
const fetchPokemonSpecies = async (pokemonId: number): Promise<PokemonSpecies> => {
    const response = await axios.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    return response.data;
};

// Define the missing props interface
interface PokemonCardProps {
    pokemon: {
        name: string;
        url: string;
    };
}
export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const navigate = useNavigate();

    const { data: details, isLoading } = useQuery({
        queryKey: ['pokemon-details', pokemon.name],
        queryFn: () => fetchPokemonDetails(pokemon.url),
    });

    // Add species query
    const { data: species } = useQuery({
        queryKey: ['pokemon-species', details?.id],
        queryFn: () => fetchPokemonSpecies(details!.id),
        enabled: !!details?.id,
    });

    const handleCardClick = () => {
        navigate(`/pokemon/${details?.name}`);
    };

    if (isLoading) {
        return (
            <LoadingCard>
                <LoadingElement className="h-24 mb-4" />
                <LoadingElement className="h-4 mb-2" />
                <LoadingElement className="h-4 w-3/4" />
            </LoadingCard>
        );
    }

    if (!details) return null;

    return (
        <ClickableCard onClick={handleCardClick}>
            <div className="flex justify-center mb-4">
                <PokemonImage
                    src={getPokemonAnimatedGif(details.id)}
                    alt={details.name}
                    onError={(e) => {
                        e.currentTarget.src = details.sprites.front_default;
                    }}
                />
            </div>

            <PokemonName>
                {details.name}
            </PokemonName>

            <StatContainer>
                <StatRow>
                    <StatLabel>Height: </StatLabel>
                    <ResultLabel><span>{details.height / 10} m</span></ResultLabel>
                </StatRow>

                <StatRow>
                    <StatLabel>Weight: </StatLabel>
                    <ResultLabel><span>{ details.weight / 10} kg</span></ResultLabel>
                </StatRow>

                {/* Add species info */}
                {species && (
                    <StatRow>
                        <StatLabel>Habitat: </StatLabel>
                        <ResultLabel><span>{ species.habitat?.name || 'Unknown'}</span> </ResultLabel>
                    </StatRow>
                )}
                <StatTypeLabel>Types:</StatTypeLabel>
                <div className="type-container">
                    {details.types.map((type, index) => (
                        <TypeBadge key={index} type={type.type.name}>
                            {type.type.name}
                            <img
                                src={getTypeIcon(type.type.name)}
                                alt={type.type.name}
                                width="25"
                                height="25"
                                className="ml-1 inline-block"
                                style={{ verticalAlign: 'middle' }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </TypeBadge>
                    ))}
                </div>
                <div className="ability">
                    <StatLabel>Abilities:</StatLabel>
                    <div className="ability-container">
                        {details.abilities.slice(0, 2).map((ability, index) => (
                            <AbilityBadge key={index}>
                                {ability.ability.name}
                            </AbilityBadge>
                        ))}
                    </div>
                </div>
            </StatContainer>
        </ClickableCard>
    );
};