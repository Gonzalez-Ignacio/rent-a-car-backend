import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { CreateUserDto } from './modules/user/domain/dto/create-user.dto';
import { Role } from './modules/user/domain/entity/user.entity';
import * as request from 'supertest';
import { Server } from 'http';
import { CreateDocumentDto } from './modules/document/domain/dto/create-document.dto';
import { CreateCarDto } from './modules/car/domain/dto/create-car.dto';
import { CreatePictureDto } from './modules/picture/domain/dto/create-picture.dto';
import { CarPicture } from './modules/picture/domain/entity/picture.entity';

describe('App', () => {
  let app: INestApplication;
  let httpServer: Server;
  let userUuid: string;

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

  const newSecondCar: CreateCarDto = {
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
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
    httpServer = app.getHttpServer() as unknown as Server;

    const createUser = await request(httpServer)
      .post('/users')
      .send(newFirstUser);
    userUuid = createUser.body.uuid as string;
  });

  describe('User', () => {
    describe('/users (POST)', () => {
      it('should create a user', async () => {
        const newSecondUser: CreateUserDto = {
          firstName: 'test Second name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testSecond@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };

        const response = await request(httpServer)
          .post('/users')
          .send(newSecondUser)
          .expect(201);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('firstName', 'test Second name');
        expect(response.body).toHaveProperty('lastName', 'test last name');
        expect(response.body).toHaveProperty('dob');
        expect(response.body).toHaveProperty('email', 'testSecond@test.com');
        expect(response.body).toHaveProperty('address', 'test address');
        expect(response.body).toHaveProperty('country', 'test country');
        expect(response.body).toHaveProperty('role', Role.USER);
        expect(response.body).toHaveProperty('documents');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not create a user with empty fields ', async () => {
        const response1 = await request(httpServer)
          .post('/users')
          .send({})
          .expect(400);

        expect(response1.body).toHaveProperty('message');
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

      it('should get a user by uuid', async () => {
        const response = await request(httpServer)
          .get(`/users/${userUuid}`)
          .expect(200);

        expect(response.body).toHaveProperty('uuid');
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
        await request(httpServer)
          .get('/users/7cdfe82e-c866-4f2a-8fd0-982d58f0f718')
          .expect(404);
      });
    });

    describe('/users (PATCH)', () => {
      it('should update a user by uuid', async () => {
        const response = await request(httpServer)
          .patch(`/users/${userUuid}`)
          .send({
            firstName: 'Test First Name',
          })
          .expect(200);

        expect(response.body).toHaveProperty('firstName', 'Test First Name');
        expect(response.body).toHaveProperty('lastName', 'test last name');
        expect(response.body).toHaveProperty('dob');
        expect(response.body).toHaveProperty('email', 'test@test.com');
        expect(response.body).toHaveProperty('address', 'test address');
        expect(response.body).toHaveProperty('country', 'test country');
        expect(response.body).toHaveProperty('role', Role.USER);
        expect(response.body).toHaveProperty('documents');
      });

      it('should not update a user by id that does not exist', async () => {
        await request(httpServer)
          .patch('/users/7cdfe82e-c866-4f2a-8fd0-982d58f0f718')
          .send({
            email: 'testSecondUser@test.com',
          })
          .expect(404);
      });
    });

    describe('/users (DELETE)', () => {
      it('should delete a user by uuid', async () => {
        const response = await request(httpServer)
          .delete(`/users/${userUuid}`)
          .expect(200);

        expect(response.body).not.toHaveProperty('uuid');
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
        await request(httpServer)
          .delete('/users/7cdfe82e-c866-4f2a-8fd0-982d58f0f718')
          .expect(404);
      });
    });
  });

  describe('Documents', () => {
    describe('/documents (POST)', () => {
      it('should create a document', async () => {
        const createUser2 = await request(httpServer)
          .post('/users')
          .send(newFirstUser);
        const userUuid2 = createUser2.body.uuid as string;

        const newDocument: CreateDocumentDto = {
          userUuid: userUuid2,
          url: 'https://example.com/document-url',
          src: 'https://example.com/document-src',
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocument);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty(
          'url',
          'https://example.com/document-url',
        );
        expect(response.body).toHaveProperty(
          'src',
          'https://example.com/document-src',
        );
        expect(response.body).toHaveProperty('title', 'Test Title');
        expect(response.body).toHaveProperty(
          'description',
          'This is a test description for the document.',
        );
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
        const newUser: CreateUserDto = {
          firstName: 'test first name',
          lastName: 'test last name',
          email: 'testSecondUser@test.com',
          dob: new Date(),
          address: 'test address',
          country: 'test country',
          role: Role.USER,
        };

        const createUser3 = await request(httpServer)
          .post('/users')
          .send(newUser);
        const userUuid3 = createUser3.body.uuid as string;

        const newDocument: CreateDocumentDto = {
          userUuid: userUuid3,
          url: 'https://example.com/document-url',
          src: 'https://example.com/document-src',
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };

        await request(httpServer).post('/documents').send(newDocument);

        const newDocument2: CreateDocumentDto = {
          userUuid: userUuid3,
          url: 'https://example.com/document-url',
          src: 'https://example2.com/document-src',
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocument2)
          .expect(409);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a document with the same src ', async () => {
        const newUser2: CreateUserDto = {
          firstName: 'test first name',
          lastName: 'test last name',
          email: 'testSecond2User@test.com',
          dob: new Date(),
          address: 'test address',
          country: 'test country',
          role: Role.USER,
        };

        const createUser4 = await request(httpServer)
          .post('/users')
          .send(newUser2);
        const userUuid4 = createUser4.body.uuid as string;

        const newDocument4: CreateDocumentDto = {
          userUuid: userUuid4,
          url: 'https://example.com/document-url',
          src: 'https://example2.com/document-src',
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };
        await request(httpServer).post('/documents').send(newDocument4);

        const newDocument5: CreateDocumentDto = {
          userUuid: userUuid4,
          url: 'https://example.com/document-url',
          src: 'https://example2.com/document-src',
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocument5)
          .expect(409);

        expect(response.body).toHaveProperty('message');
      });
    });

    describe('/documents/user/:userUuid (GET)', () => {
      it('should get all documents by User', async () => {
        // Crear nuevo usuario
        const newThirdUser: CreateUserDto = {
          firstName: 'test Third name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testThird@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };
        const createUser3 = await request(httpServer)
          .post('/users')
          .send(newThirdUser);
        const userUuid3 = createUser3.body.uuid as string;

        // Crear nuevo documento
        const newDocument2: CreateDocumentDto = {
          userUuid: userUuid3,
          url: 'test2 url',
          src: 'test2 src',
          title: 'test title 2',
          description: 'test description 2',
        };

        await request(httpServer).post('/documents').send(newDocument2);

        //Obtener documentos
        await request(httpServer)
          .get(`/documents/user/${userUuid3}`)
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

    describe(':documentUuid/user/:userUuid (GET)', () => {
      it('should get a document by id', async () => {
        // Crear nuevo usuario
        const newFourthUser: CreateUserDto = {
          firstName: 'test Fourth name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testFourth@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };
        const createUser4 = await request(httpServer)
          .post('/users')
          .send(newFourthUser);
        const userUuid4 = createUser4.body.uuid as string;

        // Crear Document 3
        const newDocument4: CreateDocumentDto = {
          userUuid: userUuid4,
          url: 'test4 url',
          src: 'test4 src',
          title: 'test title 4',
          description: 'test description 4',
        };

        const createDocument4 = await request(httpServer)
          .post('/documents')
          .send(newDocument4);
        const documentUuid4 = createDocument4.body.uuid as string;

        // Devolver 1 document
        const response = await request(httpServer)
          .get(`/documents/${documentUuid4}/user/${userUuid4}`)
          .expect(200);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('url');
        expect(response.body).toHaveProperty('src');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('createdAt');
      });

      it('should not get a document or user by id that does not exist', async () => {
        await request(httpServer)
          .get(
            '/documents/7cdfe82e-c866-4f2a-8fd0-982d58f0f718/user/7cdfe82e-c866-4f2a-8fd0-982d58f0f718',
          )
          .expect(404);
      });
    });

    describe(':documentId/user/:userId (PATCH)', () => {
      it('should update a document by id', async () => {
        // Crear nuevo usuario
        const newFifthUser: CreateUserDto = {
          firstName: 'test Fifth name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testFifth@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };
        const createUser5 = await request(httpServer)
          .post('/users')
          .send(newFifthUser);
        const userUuid5 = createUser5.body.uuid as string;

        // Crear Document 5
        const newDocument5: CreateDocumentDto = {
          userUuid: userUuid5,
          url: 'test5 url',
          src: 'test5 src',
          title: 'test title 5',
          description: 'test description 5',
        };

        const createDocument5 = await request(httpServer)
          .post('/documents')
          .send(newDocument5);
        const documentUuid5 = createDocument5.body.uuid as string;

        const response = await request(httpServer)
          .patch(`/documents/${documentUuid5}/user/${userUuid5}`)
          .send({
            url: 'test update url 4',
            src: 'test update src 4',
            title: 'test update title 4',
            description: 'test update description 4',
          })
          .expect(200);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('url', 'test update url 4');
        expect(response.body).toHaveProperty('src', 'test update src 4');
        expect(response.body).toHaveProperty('title', 'test update title 4');
        expect(response.body).toHaveProperty(
          'description',
          'test update description 4',
        );
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not update a document or user by id that does not exist', async () => {
        await request(httpServer)
          .patch(
            '/documents/7cdfe82e-c866-4f2a-8fd0-982d58f0f718/user/7cdfe82e-c866-4f2a-8fd0-982d58f0f718',
          )
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
        // Crear nuevo usuario
        const newSixthUser: CreateUserDto = {
          firstName: 'test Sixth name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testSixth@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };
        const createUser6 = await request(httpServer)
          .post('/users')
          .send(newSixthUser);
        const userUuid6 = createUser6.body.uuid as string;

        // Crear Document 5
        const newDocument6: CreateDocumentDto = {
          userUuid: userUuid6,
          url: 'test6 url',
          src: 'test6 src',
          title: 'test title 6',
          description: 'test description 6',
        };

        const createDocument6 = await request(httpServer)
          .post('/documents')
          .send(newDocument6);
        const documentUuid6 = createDocument6.body.uuid as string;

        const response = await request(httpServer)
          .delete(`/documents/${documentUuid6}/user/${userUuid6}`)
          .expect(200);

        expect(response.body).not.toHaveProperty('id');
        expect(response.body).not.toHaveProperty('url');
        expect(response.body).not.toHaveProperty('src');
        expect(response.body).not.toHaveProperty('title');
        expect(response.body).not.toHaveProperty('description');
        expect(response.body).not.toHaveProperty('createdAt');
        expect(response.body).not.toHaveProperty('updatedAt');
      });

      it('should not delete a document by uuid that does not exist', async () => {
        await request(httpServer)
          .delete(
            '/documents/f81c1189-8cf0-4111-89b3-eb860c6ab283/user/50dfec6f-4068-40f9-a889-69033f3bd547',
          )
          .expect(404);
      });
    });
  });

  describe('Car', () => {
    describe('/car (POST)', () => {
      it('should create a car', async () => {
        const response = await request(httpServer)
          .post('/cars')
          .send(newFirstCar)
          .expect(201);

        expect(response.body).toHaveProperty('uuid');
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
          .post('/cars')
          .send({})
          .expect(400);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a car with existing brand and model', async () => {
        await request(httpServer).post('/cars').send(newSecondCar).expect(409);
      });
    });

    describe('/cars (GET)', () => {
      it('should get all cars', async () => {
        const response = await request(httpServer).get('/cars').expect(200);

        expect(response.body).toBeInstanceOf(Array);
      });

      it('should get a car by uuid', async () => {
        const newThirdCar: CreateCarDto = {
          brand: 'test brand 3',
          model: 'test model 3',
          color: 'test color 3',
          passengers: 3,
          ac: false,
          pricePerDay: 3,
        };
        const createCar3 = await request(httpServer)
          .post('/cars')
          .send(newThirdCar);
        const carUUID3 = createCar3.body.uuid as string;

        const response = await request(httpServer)
          .get(`/cars/${carUUID3}`)
          .expect(200);

        expect(response.body).toHaveProperty('uuid', carUUID3);
        expect(response.body).toHaveProperty('brand', newThirdCar.brand);
        expect(response.body).toHaveProperty('model', newThirdCar.model);
        expect(response.body).toHaveProperty('color', newThirdCar.color);
        expect(response.body).toHaveProperty(
          'passengers',
          newThirdCar.passengers,
        );
        expect(response.body).toHaveProperty('ac', newThirdCar.ac);
        expect(response.body).toHaveProperty(
          'pricePerDay',
          newThirdCar.pricePerDay,
        );
        expect(response.body).toHaveProperty('createdAt');
      });

      it('should not get a car by uuid that does not exist', async () => {
        await request(httpServer)
          .get('/car/50dfec6f-4068-40f9-a889-69033f3bd547')
          .expect(404);
      });
    });

    describe('/cars (PATCH)', () => {
      it('should update a car by id', async () => {
        const newFourthCar: CreateCarDto = {
          brand: 'test brand 4',
          model: 'test model 4',
          color: 'test color 4',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCar4 = await request(httpServer)
          .post('/cars')
          .send(newFourthCar);
        const carUUID4 = createCar4.body.uuid as string;

        const response = await request(httpServer)
          .patch(`/cars/${carUUID4}`)
          .send({
            brand: 'test update brand 4',
            model: 'test update model 4',
            color: 'test update color 4',
            passengers: 4,
            ac: true,
            pricePerDay: 100,
          })
          .expect(200);

        expect(response.body).toHaveProperty('uuid', carUUID4);
        expect(response.body).toHaveProperty('brand', 'test update brand 4');
        expect(response.body).toHaveProperty('model', 'test update model 4');
        expect(response.body).toHaveProperty('color', 'test update color 4');
        expect(response.body).toHaveProperty('passengers', 4);
        expect(response.body).toHaveProperty('ac', true);
        expect(response.body).toHaveProperty('pricePerDay', 100);
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not update a cars by uuid that does not exist', async () => {
        await request(httpServer)
          .patch('/cars/50dfec6f-4068-40f9-a889-69033f3bd547')
          .send({
            brand: 'test update brand',
            model: 'test update model',
            color: 'test update color',
            passengers: 4,
            ac: true,
            pricePerDay: 100,
          })
          .expect(404);
      });
    });

    describe('/cars (DELETE)', () => {
      it('should delete a car by uuid', async () => {
        const newDeleteCar: CreateCarDto = {
          brand: 'test brand Delete',
          model: 'test model Delete',
          color: 'test color Delete',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarDelete = await request(httpServer)
          .post('/cars')
          .send(newDeleteCar);
        const carUUIDDelete = createCarDelete.body.uuid as string;

        const response = await request(httpServer)
          .delete(`/cars/${carUUIDDelete}`)
          .expect(200);

        expect(response.body).not.toHaveProperty('uuid');
        expect(response.body).not.toHaveProperty('brand');
        expect(response.body).not.toHaveProperty('model');
        expect(response.body).not.toHaveProperty('color');
        expect(response.body).not.toHaveProperty('passengers');
        expect(response.body).not.toHaveProperty('ac');
        expect(response.body).not.toHaveProperty('pricePerDay');
        expect(response.body).not.toHaveProperty('createdAt');
        expect(response.body).not.toHaveProperty('updatedAt');
      });

      it('should not delete a car by id that does not exist', async () => {
        await request(httpServer)
          .delete('/car/50dfec6f-4068-40f9-a889-69033f3bd547')
          .expect(404);
      });
    });
  });

  describe('Picture', () => {
    describe('/picture (POST)', () => {
      it('should create a picture', async () => {
        // Car for picture
        const newCarForPicture: CreateCarDto = {
          brand: 'test brand newCarForPicture',
          model: 'test model newCarForPicture',
          color: 'test color newCarForPicture',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarForPicture = await request(httpServer)
          .post('/cars')
          .send(newCarForPicture);
        const carUUIDForPicture = createCarForPicture.body.uuid as string;
        // Create Picture 1
        const newFirstPicture: CreatePictureDto = {
          carUuid: carUUIDForPicture,
          src: 'test src',
          title: 'test title',
          description: 'test description',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        const response = await request(httpServer)
          .post('/picture')
          .send(newFirstPicture)
          .expect(201);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('src', newFirstPicture.src);
        expect(response.body).toHaveProperty('title', newFirstPicture.title);
        expect(response.body).toHaveProperty(
          'description',
          newFirstPicture.description,
        );
        expect(response.body).toHaveProperty('type', newFirstPicture.type);
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });
    });

    describe('/picture (GET)', () => {
      it('should get all pictures by car', async () => {
        // new Car
        const newCarForPicture2: CreateCarDto = {
          brand: 'test brand newCarForPicture2',
          model: 'test model newCarForPicture2',
          color: 'test color newCarForPicture2',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarForPicture2 = await request(httpServer)
          .post('/cars')
          .send(newCarForPicture2);
        const carUUIDForPicture2 = createCarForPicture2.body.uuid as string;

        // Create Picture 2
        const newSecondPicture: CreatePictureDto = {
          carUuid: carUUIDForPicture2,
          src: 'test src 2',
          title: 'test title 2',
          description: 'test description 2',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        await request(httpServer).post('/picture').send(newSecondPicture);

        // Get all picture by car
        const response = await request(httpServer)
          .get(`/picture/car/${carUUIDForPicture2}`)
          .expect(200);
        expect(response.body).toBeInstanceOf(Array);
      });

      it('should not get all pictures by car that does not exist', async () => {
        await request(httpServer)
          .get('/picture/car/50dfec6f-4068-40f9-a889-69033f3bd547')
          .expect(404);
      });

      it('should get a picture by id', async () => {
        // new Car
        const newCarForPicture3: CreateCarDto = {
          brand: 'test brand newCarForPicture3',
          model: 'test model newCarForPicture3',
          color: 'test color newCarForPicture3',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarForPicture3 = await request(httpServer)
          .post('/cars')
          .send(newCarForPicture3);
        const carUUIDForPicture3 = createCarForPicture3.body.uuid as string;

        // Create Picture 3
        const newThirdPicture: CreatePictureDto = {
          carUuid: carUUIDForPicture3,
          src: 'test src 3',
          title: 'test title 3',
          description: 'test description 3',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        const createPictureUUIDThird = await request(httpServer)
          .post('/picture')
          .send(newThirdPicture);
        const pictureUUIDThird = createPictureUUIDThird.body.uuid as string;

        // Get a picture by id
        const response = await request(httpServer)
          .get(`/picture/${pictureUUIDThird}/car/${carUUIDForPicture3}`)
          .expect(200);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('src', newThirdPicture.src);
        expect(response.body).toHaveProperty('title', newThirdPicture.title);
        expect(response.body).toHaveProperty(
          'description',
          newThirdPicture.description,
        );
        expect(response.body).toHaveProperty('type', newThirdPicture.type);
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not get a picture by id that does not exist', async () => {
        await request(httpServer)
          .get('/picture/50dfec6f-4068-40f9-a889-69033f3bd547')
          .expect(404);
      });
    });

    describe('/picture/:pictureUuid/car/:carUuid (Patch)', () => {
      it('should update a picture by id', async () => {
        // new Car
        const newCarForPicture4: CreateCarDto = {
          brand: 'test brand newCarForPicture4',
          model: 'test model newCarForPicture4',
          color: 'test color newCarForPicture4',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarForPicture4 = await request(httpServer)
          .post('/cars')
          .send(newCarForPicture4);
        const carUUIDForPicture4 = createCarForPicture4.body.uuid as string;

        // Create Picture 4
        const newFourthPicture: CreatePictureDto = {
          carUuid: carUUIDForPicture4,
          src: 'test src 4',
          title: 'test title 4',
          description: 'test description 4',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        const createPictureUUIDFourth = await request(httpServer)
          .post('/picture')
          .send(newFourthPicture);
        const pictureUUIDFourth = createPictureUUIDFourth.body.uuid as string;

        const response = await request(httpServer)
          .patch(`/picture/${pictureUUIDFourth}/car/${carUUIDForPicture4}`)
          .send({
            src: 'test update src 4',
          })
          .expect(200);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('src', 'test update src 4');
        expect(response.body).toHaveProperty('title', newFourthPicture.title);
        expect(response.body).toHaveProperty(
          'description',
          newFourthPicture.description,
        );
        expect(response.body).toHaveProperty('type', newFourthPicture.type);
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      it('should not update a picture by id that does not exist', async () => {
        await request(httpServer)
          .patch(
            '/picture/50dfec6f-4068-40f9-a889-69033f3bd547/car/50dfec6f-4068-40f9-a889-69033f3bd547',
          )
          .send({
            src: 'test update src 4',
          })
          .expect(404);
      });
    });

    describe('/picture/:pictureUuid/car/:carUuid (Delete)', () => {
      it('should delete a picture by id', async () => {
        // new Car
        const newCarForPicture5: CreateCarDto = {
          brand: 'test brand newCarForPicture5',
          model: 'test model newCarForPicture5',
          color: 'test color newCarForPicture5',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarForPicture5 = await request(httpServer)
          .post('/cars')
          .send(newCarForPicture5);
        const carUUIDForPicture5 = createCarForPicture5.body.uuid as string;

        // Create Picture 5
        const newFifthPicture: CreatePictureDto = {
          carUuid: carUUIDForPicture5,
          src: 'test src 5',
          title: 'test title 5',
          description: 'test description 5',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        const createPictureUUIDFifth = await request(httpServer)
          .post('/picture')
          .send(newFifthPicture);
        const pictureUUIDFifth = createPictureUUIDFifth.body.uuid as string;

        const response = await request(httpServer)
          .delete(`/picture/${pictureUUIDFifth}/car/${carUUIDForPicture5}`)
          .expect(200);
        expect(response.body).not.toHaveProperty('uuid');
        expect(response.body).not.toHaveProperty('src');
        expect(response.body).not.toHaveProperty('title');
        expect(response.body).not.toHaveProperty('description');
        expect(response.body).not.toHaveProperty('type');
        expect(response.body).not.toHaveProperty('date');
        expect(response.body).not.toHaveProperty('createdAt');
        expect(response.body).not.toHaveProperty('updatedAt');
      });

      it('should not delete a picture by id that does not exist', async () => {
        await request(httpServer)
          .delete(
            '/picture/50dfec6f-4068-40f9-a889-69033f3bd547/car/50dfec6f-4068-40f9-a889-69033f3bd547',
          )
          .expect(404);
      });
    });
  });
});
