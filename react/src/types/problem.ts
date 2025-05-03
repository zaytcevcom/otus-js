export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
    id: number;
    title: string;
    description: string;
    inputExample: string;
    outputExample: string;
    difficulty: Difficulty;
    tags: string[];
    additionalMaterials: number[];
    rating: number | null;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProblemFormData {
    title: string;
    description: string;
    inputExample: string;
    outputExample: string;
    difficulty: Difficulty;
    tags: string;
}
