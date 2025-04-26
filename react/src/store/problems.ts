import { create } from 'zustand';
import { Problem, Difficulty } from '../types/problem';

interface ProblemStore {
    problems: Problem[];
    currentProblem: Problem | null;
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    searchQuery: string;
    difficultyFilter: string;
    fetchProblems: () => Promise<void>;
    fetchProblemById: (id: number) => Promise<void>;
    createProblem: (problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateProblem: (id: number, problem: Partial<Problem>) => Promise<void>;
    deleteProblem: (id: number) => Promise<void>;
    setPage: (page: number) => void;
    setSearchQuery: (query: string) => void;
    setDifficultyFilter: (filter: string) => void;
    resetCurrentProblem: () => void;
    updateProblemTags: (id: number, tags: string[]) => Promise<void>;
}

const mockProblems: Problem[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Problem ${i + 1}`,
    description: `This is a description for problem ${i + 1}. It explains what the problem is about and provides some context.`,
    inputExample: `Input example for problem ${i + 1}`,
    outputExample: `Output example for problem ${i + 1}`,
    difficulty: ['Easy', 'Medium', 'Hard'][i % 3] as Difficulty,
    tags: ['array', 'string', 'dynamic programming'].slice(0, (i % 3) + 1),
    additionalMaterials: [],
    rating: Math.random() * 5,
    createdBy: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
}));

export const useProblemStore = create<ProblemStore>((set, get) => ({
    problems: [],
    currentProblem: null,
    loading: false,
    error: null,
    page: 1,
    totalPages: 3,
    searchQuery: '',
    difficultyFilter: 'All',

    resetCurrentProblem: () => set({ currentProblem: null }),

    updateProblemTags: async (id, tags) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const index = mockProblems.findIndex(p => p.id === id);
            if (index !== -1) {
                mockProblems[index].tags = tags;
                set(state => ({
                    problems: state.problems.map(p =>
                        p.id === id ? {...p, tags} : p
                    ),
                    currentProblem: state.currentProblem?.id === id
                        ? {...state.currentProblem, tags}
                        : state.currentProblem
                }));
            }
        } catch (error) {
            console.error('Failed to update tags', error);
        }
    },

    fetchProblems: async () => {
        set({ loading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            const { page, searchQuery, difficultyFilter } = get();
            let filteredProblems = [...mockProblems];

            if (searchQuery) {
                filteredProblems = filteredProblems.filter(problem =>
                    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    problem.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            if (difficultyFilter !== 'All') {
                filteredProblems = filteredProblems.filter(
                    problem => problem.difficulty === difficultyFilter
                );
            }

            const itemsPerPage = 10;
            const startIndex = (page - 1) * itemsPerPage;
            const paginatedProblems = filteredProblems.slice(
                startIndex,
                startIndex + itemsPerPage
            );

            set({
                problems: paginatedProblems,
                totalPages: Math.ceil(filteredProblems.length / itemsPerPage),
                loading: false,
            });
        } catch (error) {
            set({ error: 'Failed to fetch problems', loading: false });
            console.error(error);
        }
    },

    setPage: (page) => set({ page }),
    setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
    setDifficultyFilter: (difficultyFilter) => set({ difficultyFilter, page: 1 }),

    fetchProblemById: async (id) => {
        set({ loading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const problem = mockProblems.find(p => p.id === id) || null;
            set({ currentProblem: problem, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch problem', loading: false });
            console.error(error);
        }
    },

    createProblem: async (problem) => {
        set({ loading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const newProblem: Problem = {
                ...problem,
                id: Math.max(...mockProblems.map(p => p.id), 0) + 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockProblems.unshift(newProblem);
            set(state => ({
                problems: [newProblem, ...state.problems],
                loading: false
            }));
        } catch (error) {
            set({ error: 'Failed to create problem', loading: false });
            console.error(error);
        }
    },

    updateProblem: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const index = mockProblems.findIndex(p => p.id === id);
            if (index !== -1) {
                const updatedProblem = {
                    ...mockProblems[index],
                    ...updates,
                    updatedAt: new Date()
                };
                mockProblems[index] = updatedProblem;
                set(state => ({
                    problems: state.problems.map(p => p.id === id ? updatedProblem : p),
                    currentProblem: state.currentProblem?.id === id ? updatedProblem : state.currentProblem,
                    loading: false
                }));
            }
        } catch (error) {
            set({ error: 'Failed to update problem', loading: false });
            console.error(error);
        }
    },

    deleteProblem: async (id) => {
        set({ loading: true, error: null });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const index = mockProblems.findIndex(p => p.id === id);
            if (index !== -1) {
                mockProblems.splice(index, 1);
                set(state => ({
                    problems: state.problems.filter(p => p.id !== id),
                    currentProblem: state.currentProblem?.id === id ? null : state.currentProblem,
                    loading: false
                }));
            }
        } catch (error) {
            set({ error: 'Failed to delete problem', loading: false });
            console.error(error);
        }
    },
}));
