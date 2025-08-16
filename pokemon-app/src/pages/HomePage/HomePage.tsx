import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import type {Pokemon, PokemonListResponse} from '../../types/pokemon';
import './HomePage.css'

const TitleContainer = styled.div.attrs({
    className: 'w-full mb-8 px-8 pt-8'
})`
    display: flex;
    justify-content: center;
`;

const CardsContainer = styled.div.attrs({
    className: 'cards-grid-container'
})``;

export const PageTitle = styled.h1.attrs({
    className: 'page-title'
})``;

const LoadingContainer = styled.div.attrs({
    className: 'flex justify-center items-center min-h-screen'
})``;

const LoadingText = styled.div.attrs({
    className: 'text-xl font-semibold text-white'
})`
    animation: pulse 2s infinite;
`;

const ErrorContainer = styled.div.attrs({
    className: 'flex justify-center items-center min-h-screen'
})``;

const ErrorText = styled.div.attrs({
    className: 'text-xl font-semibold text-red-200'
})``;

const fetchPokemonList = async (): Promise<PokemonListResponse> => {
    const response = await axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');
    return response.data;
};

export const HomePage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemon-list'],
        queryFn: fetchPokemonList,
    });

    if (isLoading) {
        return (
                <LoadingContainer>
                    <LoadingText>
                        ⚡ Cargando Pokemon... ⚡
                    </LoadingText>
                </LoadingContainer>
        );
    }

    if (error) {
        return (
                <ErrorContainer>
                    <ErrorText>
                        ❌ Error: {error.message}
                    </ErrorText>
                </ErrorContainer>
        );
    }

    return (
        <>
            <TitleContainer>
                <PageTitle>
                    Pokemon Battle Cards
                </PageTitle>
            </TitleContainer>
            <CardsContainer>
                {data?.results?.map((pokemon: Pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </CardsContainer>
        </>
    );
};