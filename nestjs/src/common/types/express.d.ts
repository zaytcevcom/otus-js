import { AuthUser } from '../../auth/types/types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
