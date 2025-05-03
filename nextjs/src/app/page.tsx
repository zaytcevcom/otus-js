import Link from "next/link";

export default async function AppPage() {
    return (
        <main className="container mx-auto py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6">App</h1>
            <Link
                href="/interviews"
                className="inline-block mb-4 text-blue-500 hover:underline"
            >
                Перейти к техническим интервью
            </Link>
        </main>
    );
}
