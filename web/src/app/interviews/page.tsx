import InterviewList from '@/components/InterviewList';

export default async function InterviewsPage() {
    const response = await fetch('http://localhost:3001/interviews', {
        cache: 'no-store'
    });
    const interviews = await response.json();

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Список технических интервью</h1>
            <InterviewList interviews={interviews} />
        </main>
    );
}
