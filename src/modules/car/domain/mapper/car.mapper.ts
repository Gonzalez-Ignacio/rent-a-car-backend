import { PictureMapper } from '../../../picture/domain/mapper/picture.mapper';
import { CarResponseDto } from '../dto/car.response.dto';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { Car } from '../entity/car.entity';

export class CarMapper {
  static dtoToEntity(car: CreateCarDto) {
    const newCar = new Car();

    newCar.brand = car.brand;

    newCar.model = car.model;

    newCar.img = car.img || [];

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

  static entityToDto(car: Car) {
    const carResponse = new CarResponseDto();

    carResponse.uuid = car.uuid;

    carResponse.brand = car.brand;

    carResponse.model = car.model;

    carResponse.img =
      car.img && car.img.map((picture) => PictureMapper.entityToDto(picture));

    carResponse.color = car.color;

    carResponse.passengers = car.passengers;

    carResponse.ac = car.ac;

    carResponse.pricePerDay = car.pricePerDay;

    return carResponse;
  }
}
