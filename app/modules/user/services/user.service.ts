import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public findOne(where: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOneBy(where);
  }
}
