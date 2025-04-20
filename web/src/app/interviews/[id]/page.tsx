export default async function InterviewDetail({params}: {
    params: { id: string };
}) {
    const response = await fetch(`http://localhost:3001/interviews/${params.id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        return <div>Интервью не найдено</div>;
    }

    const interview = await response.json();

    return (
        <main className="p-4">
            <h1 className="text-3xl font-bold mb-4">{interview.title}</h1>
            <div className="prose max-w-none">
                <p>{interview.content}</p>
            </div>
        </main>
    );
}
