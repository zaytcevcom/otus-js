import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}

export default function Pagination({
   currentPage,
   totalItems,
   itemsPerPage,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex justify-center mt-8 gap-2">
            {currentPage > 1 && (
                <Link
                    href={`?page=${currentPage - 1}`}
                    className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                >
                    Назад
                </Link>
            )}

            <span className="px-4 py-2">
                Страница {currentPage} из {totalPages}
            </span>

            {currentPage < totalPages && (
                <Link
                    href={`?page=${currentPage + 1}`}
                    className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                >
                    Вперед
                </Link>
            )}
        </div>
    );
}
