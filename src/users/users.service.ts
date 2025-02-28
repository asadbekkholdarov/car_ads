import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

 async create(email: string, password: string) {
    const user = await this.repo.create({ email: email, password: password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if(!id) return null
    const user = await this.repo.findOneBy({ id });
    return user;
  }

  async findAllUsers() {
    const users = await this.repo.find();
    return users
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return this.repo.remove(user);
  }
}
