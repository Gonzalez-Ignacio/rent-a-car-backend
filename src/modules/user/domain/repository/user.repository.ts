import { User } from '../entity/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findDocumentsByUser(id: number): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
}
