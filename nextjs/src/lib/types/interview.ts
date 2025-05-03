export interface Interview {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
}
