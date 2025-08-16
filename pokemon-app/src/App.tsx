import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/HomePage/HomePage";
import { PokemonDetail } from "./pages/PokemonDetail/PokemonDetail";
import './App.css';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;