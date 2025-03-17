import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user-repository.interface';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: number; token: string }> {
    let user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    createUserDto.password = await argon2.hash(createUserDto.password);

    user = await this.userRepository.create(createUserDto);
    const token = this.jwtService.sign({
      id: user.id,
      email: createUserDto.email,
    });

    return { id: user.id, token: token };
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(id);
  }
}
