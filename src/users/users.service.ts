import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async signUp(data: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOne({
      where: [{ email: data.email }, { phone_number: data.phone_number }],
    });
    if (existing)
      throw new ConflictException('Email or phone number already registered');

    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'isAdmin'],
    });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  // async update(id: number, data: Partial<User>): Promise<User> {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   Object.assign(user, data);
  //   return await this.userRepo.save(user);
  // }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
