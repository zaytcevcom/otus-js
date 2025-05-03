import Link from 'next/link';

export default function BackButton() {
    return (
        <Link
            href="/interviews"
            className="inline-block mb-4 text-blue-500 hover:underline"
        >
            ← Вернуться ко всем интервью
        </Link>
    );
}
