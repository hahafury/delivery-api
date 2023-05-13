import { UserEntity } from '@app/modules/user/entities';

declare global {
  namespace Express {
    interface Request {
      session?: {
        authorization?: string;
      };
      user: UserEntity;
    }
    interface Session {
      authorization?: string;
    }
  }
}
