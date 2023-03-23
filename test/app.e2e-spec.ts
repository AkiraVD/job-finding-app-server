import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    let testingPort: number = 3333;
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(testingPort);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:' + testingPort);
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@example.com',
      password: '1234',
    };
    describe('Signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
    });
    describe('Signin', () => {
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userToken', 'access_token');
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      it('should edit user infomation', () => {
        const dto: EditUserDto = {
          fullname: 'John Wich',
          email: 'john@example.com',
        };
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.fullname)
          .expectBodyContains(dto.email);
      });
      it('should edit change user password', () => {
        const dto: EditUserDto = {
          password: '4321',
        };
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
      it('should change user skills and certifications and return type array', () => {
        const dto: EditUserDto = {
          skills: JSON.stringify(['a', 'b', 'c', 'd']),
          certifications: JSON.stringify(['a', 'b', 'c', 'd']),
        };
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectJsonSchema({
            type: 'object',
            properties: {
              skills: { type: 'array' },
              certifications: { type: 'array' },
            },
          });
      });
    });
    describe('Delete User', () => {
      const dtoAdmin: AuthDto = {
        email: 'admin@example.com',
        password: '1234',
      };
      const dtoDel: AuthDto = {
        email: 'delete@example.com',
        password: '1234',
      };
      it('create admin', () => {
        return pactum
          .spec()
          .post('/auth/admin')
          .withBody(dtoAdmin)
          .stores('adminToken', 'access_token');
      });
      it('create user to detele', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dtoDel)
          .stores('deleteToken', 'access_token');
      });
      it('stored delete data', () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({
            Authorization: 'Bearer $S{deleteToken}',
          })
          .stores('deteleId', 'id');
      });
      it('should throw error if unauthorized', () => {
        return pactum
          .spec()
          .delete('/user/{id}')
          .withPathParams('id', '$S{deteleId}')
          .expectStatus(401);
      });
      it('should throw error if normal user try delete', () => {
        return pactum
          .spec()
          .delete('/user/{id}')
          .withPathParams('id', '$S{deteleId}')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(401);
      });
      it('should throw error if delete user not found', () => {
        return pactum
          .spec()
          .delete('/user/99999999')
          .withHeaders({
            Authorization: 'Bearer $S{adminToken}',
          })
          .expectStatus(404);
      });
      it('should delete user', () => {
        return pactum
          .spec()
          .delete('/user/{id}')
          .withPathParams('id', '$S{deteleId}')
          .withHeaders({
            Authorization: 'Bearer $S{adminToken}',
          })
          .expectStatus(200);
      });
    });
  });
});
