import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { UserRepository } from '@app/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getMe(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: id });
  }
}
