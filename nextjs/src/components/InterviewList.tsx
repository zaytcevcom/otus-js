import Link from 'next/link';
import { Interview } from '@/lib/types/interview';

interface InterviewListProps {
    interviews: Interview[];
}

export default function InterviewList({ interviews }: InterviewListProps) {
    if (!interviews.length) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No interviews found</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
                <Link
                    key={interview.id}
                    href={`/interviews/${interview.id}`}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-semibold">{interview.title}</h2>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                interview.difficulty === 'easy'
                                    ? 'bg-green-100 text-green-800'
                                    : interview.difficulty === 'medium'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                            }`}>
                                {interview.difficulty}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{interview.description}</p>
                        <div className="flex flex-wrap gap-2">
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
                </Link>
            ))}
        </div>
    );
}
