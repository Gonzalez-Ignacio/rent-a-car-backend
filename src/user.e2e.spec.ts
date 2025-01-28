import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/modules/user/domain/dto/create-user.dto';
import { Role } from '../src/modules/user/domain/entity/user.entity';
import * as request from 'supertest';

describe('User', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/users (POST)', () => {
    const newFirstUser: CreateUserDto = {
      firstName: 'test first name',
      lastName: 'test last name',
      dob: new Date(),
      email: 'test@test.com',
      address: 'test address',
      country: 'test country',
      role: Role.USER,
      documents: [],
    };
    it('should create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(newFirstUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('firstName');
      expect(response.body).toHaveProperty('lastName');
      expect(response.body).toHaveProperty('dob');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('address');
      expect(response.body).toHaveProperty('country');
      expect(response.body).toHaveProperty('role');
      expect(response.body).toHaveProperty('documents');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should not create a user with empty fields ', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should not create a user with the same email', async () => {
      await request(app.getHttpServer()).post('/users').send(newFirstUser);

      const newSecondUser: CreateUserDto = {
        firstName: 'test first name',
        lastName: 'test last name',
        dob: new Date(),
        email: 'test@test.com',
        address: 'test address',
        country: 'test country',
        role: Role.USER,
        documents: [],
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(newSecondUser)
        .expect(409);
    });
  });

  describe('/users (GET)', () => {
    it('should get all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a user by id', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/1')
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('firstName');
      expect(response.body).toHaveProperty('lastName');
      expect(response.body).toHaveProperty('dob');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('address');
      expect(response.body).toHaveProperty('country');
      expect(response.body).toHaveProperty('role');
      expect(response.body).toHaveProperty('documents');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should not get a user by id that does not exist', async () => {
      await request(app.getHttpServer()).get('/users/999').expect(404);
    });
  });

  describe('/users (PATCH)', () => {
    it('should update a user by id', async () => {
      const newSecondUser: CreateUserDto = {
        firstName: 'test first name',
        lastName: 'test last name',
        dob: new Date(),
        email: 'testing@test.com',
        address: 'test address',
        country: 'test country',
        role: Role.USER,
        documents: [],
      };

      const createFirstUser = await request(app.getHttpServer())
        .post('/users')
        .send(newSecondUser);

      const userId: number = createFirstUser.body.id as number;

      console.log('Esto devuelve cuando pido el id desde BODY:', userId);

      const response = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send({
          email: 'testSecondUser@test.com',
        })
        .expect(200);

      expect(response.body).toHaveProperty('firstName', 'test first name');
      expect(response.body).toHaveProperty('lastName', 'test last name');
      expect(response.body).toHaveProperty('dob');
      expect(response.body).toHaveProperty('email', 'testSecondUser@test.com');
      expect(response.body).toHaveProperty('address', 'test address');
      expect(response.body).toHaveProperty('country', 'test country');
      expect(response.body).toHaveProperty('role', Role.USER);
      expect(response.body).toHaveProperty('documents');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should not update a user by id that does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/users/999')
        .send({
          email: 'testSecondUser@test.com',
        })
        .expect(404);
    });
  });

  describe('/users (DELETE)', () => {
    it('should delete a user by id', async () => {
      const response = await request(app.getHttpServer())
        .delete('/users/1')
        .expect(200);

      expect(response.body).not.toHaveProperty('id');
      expect(response.body).not.toHaveProperty('firstName');
      expect(response.body).not.toHaveProperty('lastName');
      expect(response.body).not.toHaveProperty('dob');
      expect(response.body).not.toHaveProperty('email');
      expect(response.body).not.toHaveProperty('address');
      expect(response.body).not.toHaveProperty('country');
      expect(response.body).not.toHaveProperty('role');
      expect(response.body).not.toHaveProperty('documents');
      expect(response.body).not.toHaveProperty('createdAt');
      expect(response.body).not.toHaveProperty('updatedAt');
    });

    it('should not delete a user by id that does not exist', async () => {
      await request(app.getHttpServer()).delete('/users/999').expect(404);
    });
  });
});
