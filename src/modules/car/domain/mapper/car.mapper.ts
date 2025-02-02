import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { Car } from '../entity/car.entity';

export class CarMapper {
  static dtoToEntity(car: CreateCarDto) {
    const newCar = new Car();

    newCar.brand = car.brand;

    newCar.model = car.model;

    // newCar.picture = car.picture || [];

    newCar.color = car.color;

    newCar.passengers = car.passengers;

    newCar.ac = car.ac;

    newCar.pricePerDay = car.pricePerDay;

    return newCar;
  }

  static dtoToUpdateEntity(carUpdate: UpdateCarDto, carExisting: Car) {
    return {
      ...carExisting,
      ...carUpdate,
    };
  }
}
