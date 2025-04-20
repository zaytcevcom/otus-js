import { fetchInterviews } from '@/lib/mocks/interviews';
import InterviewList from '@/components/InterviewList';
import Pagination from '@/components/Pagination';

interface PageProps {
    searchParams: {
        page?: string;
    };
}

export const metadata = {
    title: 'Технические интервью',
    description: 'Подборка вопросов и ответов для подготовки',
};

export default async function InterviewsPage({searchParams}: PageProps) {
    const page = Number(searchParams.page) || 1;
    const { data: interviews, total } = await fetchInterviews({
        page,
        limit: 5,
    });

    return (
        <main className="container mx-auto py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6">Технические интервью</h1>
            <InterviewList interviews={interviews} />
            <Pagination
                currentPage={page}
                totalItems={total}
                itemsPerPage={5}
            />
        </main>
    );
}
