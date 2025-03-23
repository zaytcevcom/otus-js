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
