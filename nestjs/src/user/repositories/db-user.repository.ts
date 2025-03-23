import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from './user-repository.interface';

@Injectable()
export class DbUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly typeOrmRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return this.typeOrmRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.typeOrmRepository.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.typeOrmRepository.update(id, data);
    const user = await this.typeOrmRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
