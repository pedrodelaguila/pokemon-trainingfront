import React from 'react';
import type {ChainLink} from '../../types/pokemon';
import './EvolutionChain.css';

export const EvolutionChain: React.FC<{ chain: ChainLink }> = ({ chain }) => {
    const getPokemonIdFromUrl = (url: string): string => {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 2];
    };

    return (
        <div className="evolution-chain">
            <div className="evolution-item">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(chain.species.url)}.png`}
                    alt={chain.species.name}
                />
                <p>{chain.species.name}</p>
            </div>

            {chain.evolves_to.length > 0 && (
                <div className="evolution-branches">
                    {chain.evolves_to.map((evolution: ChainLink, index: number) => (
                        <div key={index} className="evolution-branch">
                            <div className="evolution-arrow">→</div>
                            <div className="evolution-item">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(evolution.species.url)}.png`}
                                    alt={evolution.species.name}
                                />
                                <p>{evolution.species.name}</p>

                                {evolution.evolves_to.length > 0 && (
                                    <div className="evolution-branches">
                                        {evolution.evolves_to.map((finalEvolution: ChainLink, idx: number) => (
                                            <div key={idx} className="evolution-branch">
                                                <div className="evolution-arrow">→</div>
                                                <div className="evolution-item">
                                                    <img
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(finalEvolution.species.url)}.png`}
                                                        alt={finalEvolution.species.name}
                                                    />
                                                    <p>{finalEvolution.species.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};