import { Rent } from '../entity/rent.entity';

export interface IRentRepository {
  finAll(): Promise<Rent[]>;
  save(rent: Rent): Promise<Rent>;
  findByUuid(uuid: string): Promise<Rent | null>;
  update(rent: Rent): Promise<void>;
  delete(uuid: string): Promise<void>;
}
