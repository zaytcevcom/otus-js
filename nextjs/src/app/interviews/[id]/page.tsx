import {fetchInterviewById} from '@/lib/mocks/interviews';
import {notFound} from 'next/navigation';
import BackButton from '@/components/BackButton';

export const metadata = {
    title: 'Подробная информация об интервью',
};

export default async function InterviewDetailPage({params}: {
    params: { id: string };
}) {
    const interview = await fetchInterviewById(params.id);

    if (!interview) {
        notFound();
    }

    return (
        <main className="container mx-auto py-8 px-4 max-w-4xl">
            <BackButton/>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{interview.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>Сложность:
                        <span className={`ml-1 px-2 py-1 rounded-full ${
                            interview.difficulty === 'easy'
                                ? 'bg-green-100 text-green-800'
                                : interview.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                        }`}>
                        {interview.difficulty}
                        </span>
                    </span>
                    <span>Дата: {new Date(interview.date).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {interview.tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                    ))}
                </div>
            </div>

            <article
                className="prose max-w-none"
                dangerouslySetInnerHTML={{__html: interview.content}}
            />
        </main>
    );
}
