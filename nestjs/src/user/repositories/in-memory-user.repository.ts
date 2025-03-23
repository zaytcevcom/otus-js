import { UserRepository } from './user-repository.interface';
import { User } from '../entities/user.entity';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(data: Partial<User>): Promise<User> {
    const newUser = { id: this.users.length + 1, ...data } as User;
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  async getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  async findById(id: number): Promise<User | null> {
    return Promise.resolve(this.users.find((u) => u.id === id) || null);
  }

  async findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(this.users.find((u) => u.email === email) || null);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw Error(`User with id ${id} does not exist`);
    this.users[index] = { ...this.users[index], ...data };
    return Promise.resolve(this.users[index]);
  }

  async remove(id: number): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  }
}
