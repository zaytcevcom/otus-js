import Link from 'next/link';
import { Interview } from '@/lib/types';

interface InterviewListProps {
    interviews: Interview[];
}

export default function InterviewList({ interviews }: InterviewListProps) {
    if (!interviews.length) {
        return <p>Нет доступных интервью</p>;
    }

    return (
        <ul className="space-y-4">
            {interviews.map((interview) => (
                <li key={interview.id} className="border p-4 rounded-lg">
                    <Link href={`/interviews/${interview.id}`}>
                        <div className="hover:bg-gray-50">
                            <h2 className="text-xl font-semibold">{interview.title}</h2>
                            <p className="text-gray-600">{interview.description}</p>
                            <span className="text-sm text-gray-500">
                                {new Date(interview.date).toLocaleDateString()}
                            </span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
