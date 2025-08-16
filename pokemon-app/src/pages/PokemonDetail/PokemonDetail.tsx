// In PokemonDetail.tsx
import {fetchEvolutionChain, fetchPokemonByName, fetchPokemonSpecies} from '../../services/pokemonApi';
import { PokemonName} from '../../components/PokemonCard/PokemonCard';
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from 'styled-components';
import './PokemonDetail.css'; // You might need to create this file
import { getTypeColor,getPokemonAnimatedGif } from '../../utils/pokemonUtils';
import {PageTitle} from "../HomePage/HomePage.tsx";
import { EvolutionChain } from '../../components/EvolutionChain/EvolutionChain';

// Styled Components
const DetailContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  border: 4px solid #3b82f6;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;


const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: white;
  padding: 2rem;
  animation: pulse 2s infinite;
`;

const BackButton = styled.button`
    position: fixed; // Change from absolute to fixed
    top: 1rem;
    left: 1rem;
    background: linear-gradient(45deg, #3b82f6, #facc15);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000; // Add high z-index to ensure it's above other elements

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const PokemonDetail = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate(); // Add this line to initialize navigate

    const { data: details, isLoading: isLoadingDetails, error: detailsError } = useQuery({
        queryKey: ['pokemon-details', name],
        queryFn: () => fetchPokemonByName(name!),
        enabled: !!name
    });

    const { data: species, isLoading: isLoadingSpecies } = useQuery({
        queryKey: ['pokemon-species', details?.id],
        queryFn: () => fetchPokemonSpecies(details!.id),
        enabled: !!details?.id
    });

    const { data: evolutionChain } = useQuery({
        queryKey: ['evolution-chain', species?.evolution_chain?.url],
        queryFn: () => fetchEvolutionChain(species!),
        enabled: !!species?.evolution_chain?.url
    });
    // In PokemonDetail.tsx
    const handleBackClick = () => {
        navigate('/');
    };

    if (isLoadingDetails || (details && isLoadingSpecies)) {
        return <LoadingText>⚡ Loading Pokemon Data... ⚡</LoadingText>;
    }

    if (detailsError) {
        return <LoadingText>Error loading Pokemon: {(detailsError as Error).message}</LoadingText>;
    }

    if (!details) {
        return <LoadingText>Pokemon not found</LoadingText>;
    }

    return (
        <>   <BackButton onClick={handleBackClick}>← Back to Home</BackButton>
            <PageTitle>Pokemon Details</PageTitle>
        <DetailContainer>
            <PokemonName>{details.name}</PokemonName>

            <div className="detail-content">
                <img
                    src={getPokemonAnimatedGif(details.id)}
                    alt={details.name}
                    className="detail-pokemon-image"
                    onError={(e) => {
                        e.currentTarget.src = details.sprites.front_default;
                    }}
                />

                <div className="pokemon-info">
                    <h2 className="info-section-title">Base Stats</h2>
                    <div className="stat-row">
                        <span className="stat-label">Height:</span>
                        <span className="result-label">{details.height / 10} m</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Weight:</span>
                        <span className="result-label">{details.weight / 10} kg</span>
                    </div>

                    <span className="stat-label">Types:</span>
                    <div className="type-container">
                        {details.types.map((type, index) => (
                            <span
                                key={index}
                                className="type-badge"
                                style={{ backgroundColor: getTypeColor(type.type.name) }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>

                    <span className="stat-label">Abilities:</span>
                    <div className="ability-container">
                        {details.abilities.map((ability, index) => (
                            <span key={index} className="ability-badge">
                                {ability.ability.name}
                            </span>
                        ))}
                    </div>

                    {species && evolutionChain &&(
                        <>
                            <h2 className="info-section-title">Species Info</h2>
                            <div className="stat-row">
                                <span className="stat-label">Habitat:</span>
                                <span className="result-label">{species.habitat?.name || 'Unknown'}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Legendary:</span>
                                <span className="result-label">{species.is_legendary ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Mythical:</span>
                                <span className="result-label">{species.is_mythical ? 'Yes' : 'No'}</span>
                            </div>
                            {species.flavor_text_entries && (
                                <div className="description-box">
                                    <h3>Description</h3>
                                    <p>{species.flavor_text_entries.find(entry =>
                                        entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || 'No description available'}</p>
                                </div>
                            )}
                            <h2 className="info-section-title">Evolution Chain</h2>
                            <EvolutionChain chain={evolutionChain.chain} />
                        </>
                    )}
                </div>
            </div>
        </DetailContainer>
        </>
    );
};
