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
import { CreateRentDto } from './modules/rent/domain/dto/create-rent.dto';

describe('App', () => {
  let app: INestApplication;
  let httpServer: Server;

  let createUser1: CreateUserDto;
  let createUser2: CreateUserDto;
  let globalUser1Uuid: string;
  let globalUser2Uuid: string;

  let createDocument1: CreateDocumentDto;
  let createDocument2: CreateDocumentDto;
  let globalDocument1Uuid: string;
  let globalDocument2Uuid: string;

  let createCar1: CreateCarDto;
  let createCar2: CreateCarDto;
  let globalCar1Uuid: string;
  let globalCar2Uuid: string;

  let createPicture1: CreatePictureDto;
  let createPicture2: CreatePictureDto;
  let globalPicture1Uuid: string;
  let globalPicture2Uuid: string;

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

    // First User
    const createUser1Response = await request(httpServer)
      .post('/users')
      .send({
        firstName: 'test first name',
        lastName: 'test last name',
        dob: new Date(),
        email: 'test@test.com',
        address: 'test address',
        country: 'test country',
        role: Role.ADMIN,
        documents: [],
      })
      .expect(201);

    createUser1 = createUser1Response.body as CreateUserDto;
    globalUser1Uuid = createUser1Response.body.uuid as string;

    // Second User
    const createUser2Response = await request(httpServer)
      .post('/users')
      .send({
        firstName: 'test Second name',
        lastName: 'test last name',
        dob: new Date(),
        email: 'testSecond@test.com',
        address: 'test address',
        country: 'test country',
        role: Role.USER,
        documents: [],
      })
      .expect(201);

    createUser2 = createUser2Response.body as CreateUserDto;
    globalUser2Uuid = createUser2Response.body.uuid as string;

    // First Document
    const createDocument1Response = await request(httpServer)
      .post('/documents')
      .send({
        userUuid: globalUser1Uuid,
        url: 'https://example.com/document-url',
        src: 'https://example.com/document-src',
        title: 'Test Title',
        description: 'This is a test description for the document.',
      })
      .expect(201);

    createDocument1 = createDocument1Response.body as CreateDocumentDto;
    globalDocument1Uuid = createDocument1Response.body.uuid as string;

    // Second Document
    const createDocument2Response = await request(httpServer)
      .post('/documents')
      .send({
        userUuid: globalUser1Uuid,
        url: 'https://example.com/document2-url',
        src: 'https://example.com/document2-src',
        title: 'Test Title 2',
        description: 'This is a test description for the document 2.',
      })
      .expect(201);

    createDocument2 = createDocument2Response.body as CreateDocumentDto;
    globalDocument2Uuid = createDocument2Response.body.uuid as string;

    //First Car
    const createCar1Response = await request(httpServer)
      .post('/cars')
      .send({
        brand: 'test brand',
        model: 'test model',
        color: 'test color',
        passengers: 4,
        ac: true,
        pricePerDay: 100,
      })
      .expect(201);
    createCar1 = createCar1Response.body as CreateCarDto;
    console.log(createCar1);
    globalCar1Uuid = createCar1Response.body.uuid as string;

    // Second Car
    const createCar2Response = await request(httpServer)
      .post('/cars')
      .send({
        brand: 'test brand 2',
        model: 'test model 2',
        color: 'test color 2',
        passengers: 4,
        ac: true,
        pricePerDay: 200,
      })
      .expect(201);
    createCar2 = createCar2Response.body as CreateCarDto;
    globalCar2Uuid = createCar2Response.body.uuid as string;

    //First Picture
    const createPicture1Response = await request(httpServer)
      .post('/picture')
      .send({
        carUuid: globalCar1Uuid,
        src: 'https://example.com/picture1-url',
        title: 'test title',
        description: 'test description',
        type: CarPicture.FRONT,
        date: new Date(),
      })
      .expect(201);
    createPicture1 = createPicture1Response.body as CreatePictureDto;
    globalPicture1Uuid = createPicture1Response.body.uuid as string;

    // Second Picture
    const createPicture2Response = await request(httpServer)
      .post('/picture')
      .send({
        carUuid: globalCar1Uuid,
        src: 'https://example.com/picture2-src',
        title: 'Test Title 2',
        description: 'This is a test description for the picture 2.',
        type: CarPicture.BACK,
        date: new Date(),
      })
      .expect(201);

    createPicture2 = createPicture2Response.body as CreatePictureDto;
    globalPicture2Uuid = createPicture2Response.body.uuid as string;
  });

  describe('User', () => {
    describe('/users (POST)', () => {
      it('should create a user', async () => {
        const createUser3: CreateUserDto = {
          firstName: 'test Third name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testThird@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };
        const response = await request(httpServer)
          .post('/users')
          .send(createUser3)
          .expect(201);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty(
          'firstName',
          createUser3.firstName,
        );
        expect(response.body).toHaveProperty('lastName', createUser3.lastName);
        expect(response.body).toHaveProperty('dob');
        expect(response.body).toHaveProperty('email', createUser3.email);
        expect(response.body).toHaveProperty('address', createUser3.address);
        expect(response.body).toHaveProperty('country', createUser3.country);
        expect(response.body).toHaveProperty('role', createUser3.role);
        expect(response.body).toHaveProperty('documents');
      });
      it('should not create a user with empty fields ', async () => {
        const response1 = await request(httpServer)
          .post('/users')
          .send({})
          .expect(400);
        expect(response1.body).toHaveProperty('message');
      });
      it('should not create a user with the same email', async () => {
        const createUser4: CreateUserDto = {
          firstName: 'test first name',
          lastName: 'test last name',
          dob: new Date(),
          email: createUser1.email,
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        };
        await request(httpServer).post('/users').send(createUser4).expect(409);
      });
    });

    describe('/users (GET)', () => {
      it('should get all users', async () => {
        const response = await request(httpServer).get('/users').expect(200);
        expect(response.body).toBeInstanceOf(Array);
      });
      it('should get a user by uuid', async () => {
        const response = await request(httpServer)
          .get(`/users/${globalUser1Uuid}`)
          .expect(200);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty(
          'firstName',
          createUser1.firstName,
        );
        expect(response.body).toHaveProperty('lastName', createUser1.lastName);
        expect(response.body).toHaveProperty('dob');
        expect(response.body).toHaveProperty('email', createUser1.email);
        expect(response.body).toHaveProperty('address', createUser1.address);
        expect(response.body).toHaveProperty('country', createUser1.country);
        expect(response.body).toHaveProperty('role', createUser1.role);
        expect(response.body).toHaveProperty('documents');
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
          .patch(`/users/${globalUser2Uuid}`)
          .send({
            firstName: 'Testing Second Name',
          })
          .expect(200);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty(
          'firstName',
          'Testing Second Name',
        );
        expect(response.body).toHaveProperty('lastName', createUser2.lastName);
        expect(response.body).toHaveProperty('dob');
        expect(response.body).toHaveProperty('email', createUser2.email);
        expect(response.body).toHaveProperty('address', createUser2.address);
        expect(response.body).toHaveProperty('country', createUser2.country);
        expect(response.body).toHaveProperty('role', createUser2.role);
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
        const createUser4 = await request(httpServer).post('/users').send({
          firstName: 'test Fourth name',
          lastName: 'test last name',
          dob: new Date(),
          email: 'testFourthUser@test.com',
          address: 'test address',
          country: 'test country',
          role: Role.USER,
          documents: [],
        });
        const user4Uuid = createUser4.body.uuid as string;
        const response = await request(httpServer)
          .delete(`/users/${user4Uuid}`)
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
        const createDocument3: CreateDocumentDto = {
          userUuid: globalUser1Uuid,
          url: 'https://example.com/document3-url',
          src: 'https://example.com/document3-src',
          title: 'Test Title 3',
          description: 'This is a test description for the document 3.',
        };
        const response = await request(httpServer)
          .post('/documents')
          .send(createDocument3);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty(
          'url',
          'https://example.com/document3-url',
        );
        expect(response.body).toHaveProperty(
          'src',
          'https://example.com/document3-src',
        );
        expect(response.body).toHaveProperty('title', 'Test Title 3');
        expect(response.body).toHaveProperty(
          'description',
          'This is a test description for the document 3.',
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
        const newDocumentUrlRepeat: CreateDocumentDto = {
          userUuid: globalUser1Uuid,
          url: createDocument2.url,
          src: 'https://example.com/document123-src',
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocumentUrlRepeat)
          .expect(409);

        expect(response.body).toHaveProperty('message');
      });

      it('should not create a document with the same src ', async () => {
        const newDocumentSrcRepeat: CreateDocumentDto = {
          userUuid: globalUser1Uuid,
          url: 'https://example.com/document54-url',
          src: createDocument1.src,
          title: 'Test Title',
          description: 'This is a test description for the document.',
        };

        const response = await request(httpServer)
          .post('/documents')
          .send(newDocumentSrcRepeat)
          .expect(409);

        expect(response.body).toHaveProperty('message');
      });
    });

    describe('/documents/user/:userUuid (GET)', () => {
      it('should get all documents by User', async () => {
        await request(httpServer)
          .get(`/documents/user/${globalUser1Uuid}`)
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

      it('should not get all documents by User that does not exist', async () => {
        await request(httpServer)
          .get('/documents/user/7cdfe82e-c866-4f2a-8fd0-982d58f0f718')
          .expect(404);
      });
    });

    describe(':documentUuid/user/:userUuid (GET)', () => {
      it('should get a document by id', async () => {
        const response = await request(httpServer)
          .get(`/documents/${globalDocument1Uuid}/user/${globalUser1Uuid}`)
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
        const response = await request(httpServer)
          .patch(`/documents/${globalDocument2Uuid}/user/${globalUser1Uuid}`)
          .send({
            url: 'test update url 2',
          })
          .expect(200);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('url', 'test update url 2');
        expect(response.body).toHaveProperty('src');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('createdAt');
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
        const createDocumentDelete: CreateDocumentDto = {
          userUuid: globalUser1Uuid,
          url: 'test url delete',
          src: 'test src delete',
          title: 'test title delete',
          description: 'test description delete',
        };

        const newDocumentDelete = await request(httpServer)
          .post('/documents')
          .send(createDocumentDelete);
        const documentUuidDelete = newDocumentDelete.body.uuid as string;

        const response = await request(httpServer)
          .delete(`/documents/${documentUuidDelete}/user/${globalUser1Uuid}`)
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
        const createCar3: CreateCarDto = {
          brand: 'test brand 3',
          model: 'test model 3',
          color: 'test color 3',
          passengers: 4,
          ac: true,
          pricePerDay: 100,
        };

        const response = await request(httpServer)
          .post('/cars')
          .send(createCar3)
          .expect(201);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('brand', createCar3.brand);
        expect(response.body).toHaveProperty('model', createCar3.model);
        expect(response.body).toHaveProperty('color', createCar3.color);
        expect(response.body).toHaveProperty(
          'passengers',
          createCar3.passengers,
        );
        expect(response.body).toHaveProperty('ac', createCar3.ac);
        expect(response.body).toHaveProperty(
          'pricePerDay',
          createCar3.pricePerDay,
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
        await request(httpServer)
          .post('/cars')
          .send({
            brand: createCar2.brand,
            model: createCar2.model,
            color: 'test color 1',
            passengers: 4,
            ac: true,
            pricePerDay: 100,
          })
          .expect(409);
      });
    });

    describe('/cars (GET)', () => {
      it('should get all cars', async () => {
        const response = await request(httpServer).get('/cars').expect(200);

        expect(response.body).toBeInstanceOf(Array);
      });

      it('should get a car by uuid', async () => {
        const response = await request(httpServer)
          .get(`/cars/${globalCar1Uuid}`)
          .expect(200);

        expect(response.body).toHaveProperty('uuid', globalCar1Uuid);
        expect(response.body).toHaveProperty('brand', createCar1.brand);
        expect(response.body).toHaveProperty('model', createCar1.model);
        expect(response.body).toHaveProperty('color', createCar1.color);
        expect(response.body).toHaveProperty(
          'passengers',
          createCar1.passengers,
        );
        expect(response.body).toHaveProperty('ac', createCar1.ac);
        expect(response.body).toHaveProperty(
          'pricePerDay',
          createCar1.pricePerDay,
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
        const response = await request(httpServer)
          .patch(`/cars/${globalCar2Uuid}`)
          .send({
            brand: 'test update brand 2',
          })
          .expect(200);

        expect(response.body).toHaveProperty('uuid', globalCar2Uuid);
        expect(response.body).toHaveProperty('brand', 'test update brand 2');
        expect(response.body).toHaveProperty('model', createCar2.model);
        expect(response.body).toHaveProperty('color', createCar2.color);
        expect(response.body).toHaveProperty(
          'passengers',
          createCar2.passengers,
        );
        expect(response.body).toHaveProperty('ac', createCar2.ac);
        expect(response.body).toHaveProperty(
          'pricePerDay',
          createCar2.pricePerDay,
        );
        expect(response.body).toHaveProperty('createdAt');
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
        const createCarDelete: CreateCarDto = {
          brand: 'test brand Delete',
          model: 'test model Delete',
          color: 'test color Delete',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarDeleteResponse = await request(httpServer)
          .post('/cars')
          .send(createCarDelete);
        const carUUIDDelete = createCarDeleteResponse.body.uuid as string;

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
        console.log('carGlobal -->', globalCar1Uuid);
        const createPicture3: CreatePictureDto = {
          carUuid: globalCar1Uuid,
          src: 'test src 3',
          title: 'test title 3',
          description: 'test description 3',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        const response = await request(httpServer)
          .post('/picture')
          .send(createPicture3)
          .expect(201);

        console.log('picture 3 -->', response.body);

        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('src', createPicture3.src);
        expect(response.body).toHaveProperty('title', createPicture3.title);
        expect(response.body).toHaveProperty(
          'description',
          createPicture3.description,
        );
        expect(response.body).toHaveProperty('type', createPicture3.type);
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });
    });

    describe('/picture (GET)', () => {
      it('should get all pictures by car', async () => {
        const response = await request(httpServer)
          .get(`/picture/car/${globalCar1Uuid}`)
          .expect(200);
        expect(response.body).toBeInstanceOf(Array);
      });

      it('should not get all pictures by car that does not exist', async () => {
        await request(httpServer)
          .get('/picture/car/50dfec6f-4068-40f9-a889-69033f3bd547')
          .expect(404);
      });

      it('should get a picture by id', async () => {
        const response = await request(httpServer)
          .get(`/picture/${globalPicture1Uuid}/car/${globalCar1Uuid}`)
          .expect(200);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('src', createPicture1.src);
        expect(response.body).toHaveProperty('title', createPicture1.title);
        expect(response.body).toHaveProperty(
          'description',
          createPicture1.description,
        );
        expect(response.body).toHaveProperty('type', createPicture1.type);
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
        const response = await request(httpServer)
          .patch(`/picture/${globalPicture2Uuid}/car/${globalCar1Uuid}`)
          .send({
            title: 'test update title 2',
          })
          .expect(200);
        expect(response.body).toHaveProperty('uuid');
        expect(response.body).toHaveProperty('src', createPicture2.src);
        expect(response.body).toHaveProperty('title', 'test update title 2');
        expect(response.body).toHaveProperty(
          'description',
          createPicture2.description,
        );
        expect(response.body).toHaveProperty('type', createPicture2.type);
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
        // new Car for delete
        const createCarForPictureDelete: CreateCarDto = {
          brand: 'test brand newCarForPicture5',
          model: 'test model newCarForPicture5',
          color: 'test color newCarForPicture5',
          passengers: 4,
          ac: false,
          pricePerDay: 4,
        };
        const createCarForPictureDeleteResponse = await request(httpServer)
          .post('/cars')
          .send(createCarForPictureDelete);
        const carUuidForPictureDelete = createCarForPictureDeleteResponse.body
          .uuid as string;

        // Create Picture for delete
        const createPictureDelete: CreatePictureDto = {
          carUuid: carUuidForPictureDelete,
          src: 'test src 5',
          title: 'test title 5',
          description: 'test description 5',
          type: CarPicture.FRONT,
          date: new Date(),
        };
        const createPictureUUIDFifth = await request(httpServer)
          .post('/picture')
          .send(createPictureDelete);
        const pictureUuidDelete = createPictureUUIDFifth.body.uuid as string;

        const response = await request(httpServer)
          .delete(
            `/picture/${pictureUuidDelete}/car/${carUuidForPictureDelete}`,
          )
          .expect(200);
        expect(response.body).not.toHaveProperty('uuid');
        expect(response.body).not.toHaveProperty('src');
        expect(response.body).not.toHaveProperty('title');
        expect(response.body).not.toHaveProperty('description');
        expect(response.body).not.toHaveProperty('type');
        expect(response.body).not.toHaveProperty('date');
        expect(response.body).not.toHaveProperty('createdAt');
        expect(response.body).not.toHaveProperty('updatedAt');

        await request(httpServer).delete(`/cars/${carUuidForPictureDelete}`);
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

  describe('/rent (POST)', () => {
    it('should create a rent', async () => {
      const createRent3: CreateRentDto = {
        carUuid: globalCar1Uuid,
        userUuid: globalUser1Uuid,
        acceptedDate: new Date(),
        rejected: false,
        startingDate: new Date(),
        dueDate: new Date(),
        endDate: new Date(),
      };

      const response = await request(httpServer)
        .post('/rent')
        .send(createRent3)
        .expect(201);
      expect(response.body).toHaveProperty('uuid');
      expect(response.body).toHaveProperty('car');
      expect(response.body).toHaveProperty(
        'pricePerDay',
        createCar1.pricePerDay,
      );
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('admin');
      expect(response.body).toHaveProperty('acceptedDate');
      expect(response.body).toHaveProperty('rejected');
      expect(response.body).toHaveProperty('startingDate');
      expect(response.body).toHaveProperty('dueDate');
      expect(response.body).toHaveProperty('endDate');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });
  });
});
