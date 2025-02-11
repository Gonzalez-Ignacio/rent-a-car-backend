import { Rent } from '../entity/rent.entity';

export interface IRentRepository {
  finAll(): Promise<Rent[]>;
  findOneRentByUser(userUuid: string, rentUuid: string): Promise<Rent | null>;
  save(rent: Rent): Promise<Rent>;
  findByUuid(uuid: string): Promise<Rent | null>;
  update(rent: Rent): Promise<void>;
  delete(uuid: string): Promise<void>;
}
