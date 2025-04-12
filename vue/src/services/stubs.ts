type stubTaskType = {
    id: number,
    title: string,
    description: string,
    date: string,
    examples: stubTaskExampleType[]
}

type stubTaskExampleType = {
    input: string,
    output: string,
}

export const stubTasks: stubTaskType[] = [
    {
        id: 1,
        title: 'Задача #1',
        description: 'Описание #1',
        date: '18.03.2025',
        examples: []
    },
    {
        id: 2,
        title: 'Задача #2',
        description: 'Описание #2',
        date: '20.03.2025',
        examples: []
    },
    {
        id: 3,
        title: 'Задача #3',
        description: 'Описание #3',
        date: '23.03.2025',
        examples: []
    },
    {
        id: 4,
        title: 'Задача #4',
        description: 'Описание #4',
        date: '23.03.2025',
        examples: []
    },
    {
        id: 5,
        title: 'Задача #5',
        description: 'Описание #5',
        date: '23.03.2025',
        examples: []
    },
]
