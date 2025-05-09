import { useMemo, useCallback } from 'react';

interface PromptSuggestion {
  id: string;
  text: string;
  category: string;
}

interface UsePromptSuggestionsReturn {
  suggestions: PromptSuggestion[];
  getRandomSuggestion: () => PromptSuggestion;
  getSuggestionsByCategory: (category: string) => PromptSuggestion[];
  getSuggestionById: (id: string) => PromptSuggestion | undefined;
}

const usePromptSuggestions = (): UsePromptSuggestionsReturn => {
  const suggestions = useMemo<PromptSuggestion[]>(() => [
    {
      id: 'hexa',
      text: "A blue lion logo reading 'HEXA' in bold letters",
      category: 'bold'
    },
    {
      id: 'echo',
      text: "A minimalist logo for 'ECHO' coffee shop",
      category: 'minimalist'
    },
    {
      id: 'harrison',
      text: "A professional logo for 'Harrison & Co.' law firm, using balanced serif fonts",
      category: 'professional'
    },
    {
      id: 'pixel',
      text: "A modern tech logo for 'Pixel' software company",
      category: 'tech'
    },
    {
      id: 'bloom',
      text: "An elegant logo for 'Bloom' flower shop",
      category: 'elegant'
    },
    {
      id: 'vertex',
      text: "A geometric logo with triangles for 'Vertex' architecture firm",
      category: 'geometric'
    },
    {
      id: 'wave',
      text: "A fluid, wave-inspired logo for 'Ocean' surfing brand",
      category: 'fluid'
    },
    {
      id: 'spark',
      text: "A vibrant logo with lightning bolt for 'Spark' energy drink",
      category: 'vibrant'
    },
  ], []);

  const getRandomSuggestion = useCallback((): PromptSuggestion => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  }, [suggestions]);

  const getSuggestionsByCategory = useCallback((category: string): PromptSuggestion[] => {
    return suggestions.filter(suggestion => suggestion.category === category);
  }, [suggestions]);

  const getSuggestionById = useCallback((id: string): PromptSuggestion | undefined => {
    return suggestions.find(suggestion => suggestion.id === id);
  }, [suggestions]);

  return {
    suggestions,
    getRandomSuggestion,
    getSuggestionsByCategory,
    getSuggestionById
  };
};

export default usePromptSuggestions; 