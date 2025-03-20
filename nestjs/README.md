# LeetCode Clone API

Это API для клона платформы LeetCode, разработанное с использованием Nest.js. API предоставляет функциональность для работы с задачами по программированию, пользователями, решениями и соревнованиями.

## Основные функции

- Регистрация и авторизация пользователей
- Создание, чтение, обновление и удаление задач
- Отправка решений и их оценка
- Управление соревнованиями
- Отслеживание прогресса пользователей

## Технологии

- Nest.js
- TypeScript
- PostgreSQL (через TypeORM)
- Jest для тестирования
- Swagger для документации API

## Установка и запуск

1. Клонируйте репозиторий
2. Установите зависимости: `npm install`
3. Настройте переменные окружения в файле `.env`
4. Запустите сервер: `npm run start:dev`

API будет доступно по адресу `http://localhost:3000/api`

## Документация API

Swagger документация доступна по адресу `http://localhost:3000/api/docs`

## Тестирование

Для запуска тестов используйте команду: `npm run test`

---

## Модели данных
1.	User (Пользователь)
```ts
export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'interviewer';
    rating: number;
    solvedProblems: number[];
    createdAt: Date;
    updatedAt: Date;
}
```
2.	Problem (Задача)
```ts
export class Problem {
    id: number;
    title: string;
    description: string;
    inputExample: string;
    outputExample: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    additionalMaterials: number[];
    rating: number;
    createdBy: number; // ID пользователя-создателя
    createdAt: Date;
    updatedAt: Date;
}
```
3.	AdditionalMaterial (Дополнительный материал)
```ts
export class AdditionalMaterial {
    id: number;
    problemId: number;
    type: 'file' | 'link';
    content: string; // URL для ссылок или путь к файлу
    description: string;
}
```
4. Comment (Комментарий)
```ts
export class Comment {
  id: number;
  problemId: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```
5. ProblemRating (Оценка задачи)
```ts
export class ProblemRating {
  id: number;
  problemId: number;
  userId: number;
  rating: number;
  createdAt: Date;
}
```
6. Tag (Тег)
```ts
export class Tag {
  id: number;
  name: string;
  description: string;
}
```
