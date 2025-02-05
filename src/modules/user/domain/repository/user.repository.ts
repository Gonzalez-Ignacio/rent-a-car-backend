import { User } from '../entity/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUuid(uuid: string): Promise<User | null>;
  findDocumentsByUser(uuid: string): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(uuid: string): Promise<void>;
}
