import type { Metadata } from 'next';
import React from "react";

export const metadata: Metadata = {
    title: 'Технические интервью',
    description: 'Подборка вопросов и ответов для подготовки',
};

export default function InterviewsLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-8 px-4">
                {children}
            </div>
        </div>
    );
}
