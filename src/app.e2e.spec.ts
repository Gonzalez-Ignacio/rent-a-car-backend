import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { CreateUserDto } from './modules/user/domain/dto/create-user.dto';
import { Role } from './modules/user/domain/entity/user.entity';
import * as request from 'supertest';
import { Server } from 'http';
import { CreateDocumentDto } from './modules/document/domain/dto/create-document.dto';
import { CreateCarDto } from './modules/car/domain/dto/create-car.dto';

describe('App', () => {
  let app: INestApplication;
  let httpServer: Server;

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

  const newFirstCar: CreateCarDto = {
    brand: 'test brand',
    model: 'test model',
    color: 'test color',
    passengers: 4,
    ac: true,
    pricePerDay: 100,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer() as unknown as Server;
  });

  describe('User', () => {
    describe('/users (POST)', () => {
      it('should create a user', async () => {
        const response = await request(httpServer)
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
        const response = await request(httpServer)
          .post('/users')
          .send({})
          .expect(400);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a user with the same email', async () => {
        await request(httpServer).post('/users').send(newFirstUser);

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

        await request(httpServer)
          .post('/users')
          .send(newSecondUser)
          .expect(409);
      });
    });

    describe('/users (GET)', () => {
      it('should get all users', async () => {
        const response = await request(httpServer).get('/users').expect(200);

        expect(response.body).toBeInstanceOf(Array);
      });

      it('should get a user by id', async () => {
        const response = await request(httpServer).get('/users/1').expect(200);

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
        await request(httpServer).get('/users/999').expect(404);
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

        const createFirstUser = await request(httpServer)
          .post('/users')
          .send(newSecondUser);

        const userId: number = createFirstUser.body.id as number;

        const response = await request(httpServer)
          .patch(`/users/${userId}`)
          .send({
            email: 'testSecondUser@test.com',
          })
          .expect(200);

        expect(response.body).toHaveProperty('firstName', 'test first name');
        expect(response.body).toHaveProperty('lastName', 'test last name');
        expect(response.body).toHaveProperty('dob');
        expect(response.body).toHaveProperty(
          'email',
          'testSecondUser@test.com',
        );
        expect(response.body).toHaveProperty('address', 'test address');
        expect(response.body).toHaveProperty('country', 'test country');
        expect(response.body).toHaveProperty('role', Role.USER);
        expect(response.body).toHaveProperty('documents');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not update a user by id that does not exist', async () => {
        await request(httpServer)
          .patch('/users/999')
          .send({
            email: 'testSecondUser@test.com',
          })
          .expect(404);
      });
    });

    describe('/users (DELETE)', () => {
      it('should delete a user by id', async () => {
        const response = await request(httpServer)
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
        await request(httpServer).delete('/users/999').expect(404);
      });
    });
  });

  describe('Documents', () => {
    beforeAll(async () => {
      await request(httpServer).post('/users').send(newFirstUser);
    });

    describe('/documents (POST)', () => {
      it('should create a document', async () => {
        const newDocument: CreateDocumentDto = {
          userId: 2,
          url: 'test url',
          src: 'test src',
          title: 'test title',
          description: 'test description',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocument)
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url', 'test url');
        expect(response.body).toHaveProperty('src', 'test src');
        expect(response.body).toHaveProperty('title', 'test title');
        expect(response.body).toHaveProperty('description', 'test description');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not create a document with empty fields ', async () => {
        const response = await request(httpServer)
          .post('/documents')
          .send({})
          .expect(400);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a document with the same url ', async () => {
        const newDocument1: CreateDocumentDto = {
          userId: 2,
          url: 'test url',
          src: 'test src',
          title: 'test title',
          description: 'test description',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocument1)
          .expect(409);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a document with the same src ', async () => {
        const newDocument: CreateDocumentDto = {
          userId: 2,
          url: 'test url',
          src: 'test src',
          title: 'test title',
          description: 'test description',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocument)
          .expect(409);

        expect(response.body).toHaveProperty('message');
      });
    });

    describe('user/:userId (GET)', () => {
      it('should get all documents by User', async () => {
        const newDocument2: CreateDocumentDto = {
          userId: 2,
          url: 'test2 url',
          src: 'test2 src',
          title: 'test title 2',
          description: 'test description 2',
        };
        await request(httpServer).post('/documents').send(newDocument2);

        await request(httpServer)
          .get('/documents/user/2')
          .expect(200)
          .then((res) => {
            const body = res.body as string[];

            // @ts-error
            const expected = expect.arrayContaining([
              expect.objectContaining({
                url: expect.any(String) as string,
                src: expect.any(String) as string,
                title: expect.any(String) as string,
                description: expect.any(String) as string,
              }),
            ]) as unknown as string[];

            expect(body).toEqual(expected);
          });
      });
    });

    describe(':documentId/user/:userId (GET)', () => {
      it('should get a document by id', async () => {
        const response = await request(httpServer)
          .get('/documents/1/user/2')
          .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('url', 'test url');
        expect(response.body).toHaveProperty('src', 'test src');
        expect(response.body).toHaveProperty('title', 'test title');
        expect(response.body).toHaveProperty('description', 'test description');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not get a document or user by id that does not exist', async () => {
        await request(httpServer).get('/documents/999/user/999').expect(404);
      });
    });

    describe(':documentId/user/:userId (PATCH)', () => {
      it('should update a document by id', async () => {
        const response = await request(httpServer)
          .patch('/documents/1/user/2')
          .send({
            url: 'test update url 2',
            src: 'test update src 2',
            title: 'test update title 2',
            description: 'test update description 2',
          })
          .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('url', 'test update url 2');
        expect(response.body).toHaveProperty('src', 'test update src 2');
        expect(response.body).toHaveProperty('title', 'test update title 2');
        expect(response.body).toHaveProperty(
          'description',
          'test update description 2',
        );
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not update a document or user by id that does not exist', async () => {
        await request(httpServer)
          .patch('/documents/999/user/999')
          .send({
            url: 'test update url 2',
            src: 'test update src 2',
            title: 'test update title 2',
            description: 'test update description 2',
          })
          .expect(404);
      });
    });

    describe(':documentId/user/:userId (DELETE)', () => {
      it('should delete a document by id', async () => {
        const response = await request(httpServer)
          .delete('/documents/1/user/2')
          .expect(200);

        expect(response.body).not.toHaveProperty('id');
        expect(response.body).not.toHaveProperty('url');
        expect(response.body).not.toHaveProperty('src');
        expect(response.body).not.toHaveProperty('title');
        expect(response.body).not.toHaveProperty('description');
        expect(response.body).not.toHaveProperty('createdAt');
        expect(response.body).not.toHaveProperty('updatedAt');
      });

      it('should not delete a user by id that does not exist', async () => {
        await request(httpServer).delete('/users/999').expect(404);
      });
    });
  });

  describe('Car', () => {
    describe('/car (POST)', () => {
      it('should create a car', async () => {
        const response = await request(httpServer)
          .post('/car')
          .send(newFirstCar)
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('brand', newFirstCar.brand);
        expect(response.body).toHaveProperty('model', newFirstCar.model);
        expect(response.body).toHaveProperty('color', newFirstCar.color);
        expect(response.body).toHaveProperty(
          'passengers',
          newFirstCar.passengers,
        );
        expect(response.body).toHaveProperty('ac', newFirstCar.ac);
        expect(response.body).toHaveProperty(
          'pricePerDay',
          newFirstCar.pricePerDay,
        );
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not create a car with empty fields ', async () => {
        const response = await request(httpServer)
          .post('/car')
          .send({})
          .expect(400);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a car with existing brand and model', async () => {
        const newSecondCar: CreateCarDto = {
          brand: 'test brand',
          model: 'test model',
          color: 'test color',
          passengers: 4,
          ac: true,
          pricePerDay: 100,
        };
        await request(httpServer).post('/car').send(newSecondCar).expect(409);
      });
    });

    describe('/car (GET)', () => {
      it('should get all cars', async () => {
        const response = await request(httpServer).get('/car').expect(200);

        expect(response.body).toBeInstanceOf(Array);
      });

      it('should get a car by id', async () => {
        const response = await request(httpServer).get('/car/1').expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('brand', newFirstCar.brand);
        expect(response.body).toHaveProperty('model', newFirstCar.model);
        expect(response.body).toHaveProperty('color', newFirstCar.color);
        expect(response.body).toHaveProperty(
          'passengers',
          newFirstCar.passengers,
        );
        expect(response.body).toHaveProperty('ac', newFirstCar.ac);
        expect(response.body).toHaveProperty(
          'pricePerDay',
          newFirstCar.pricePerDay,
        );
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not get a car by id that does not exist', async () => {
        await request(httpServer).get('/car/999').expect(404);
      });
    });
  });
});
