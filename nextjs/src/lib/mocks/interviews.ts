import { Interview } from '../types/interview';

export const mockInterviews: Interview[] = [
    {
        id: '1',
        title: 'JavaScript Interview',
        description: 'Frontend JavaScript questions for mid-level developers',
        content: '<h2>Question 1: Explain event loop</h2><p>JavaScript has a runtime model based on event loop...</p>',
        date: '2024-05-15',
        difficulty: 'medium',
        tags: ['javascript', 'frontend']
    },
    {
        id: '2',
        title: 'System Design Basics',
        description: 'Fundamental system design concepts',
        content: '<h2>Question 1: What is CAP theorem?</h2><p>The CAP theorem states that...</p>',
        date: '2024-06-01',
        difficulty: 'hard',
        tags: ['system-design', 'backend']
    },
    {
        id: '3',
        title: 'CSS Fundamentals',
        description: 'Basic CSS concepts for beginners',
        content: '<h2>Question 1: What is CSS Box Model?</h2><p>The CSS box model describes...</p>',
        date: '2024-04-20',
        difficulty: 'easy',
        tags: ['css', 'frontend']
    }
];

export const fetchInterviews = async (options?: {
    page?: number;
    limit?: number;
}): Promise<{ data: Interview[]; total: number }> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...mockInterviews];

    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const start = (page - 1) * limit;

    return {
        data: results.slice(start, start + limit),
        total: results.length,
    };
};

export const fetchInterviewById = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockInterviews.find(i => i.id === id);
};
