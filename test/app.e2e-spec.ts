import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import {
  getMeTest,
  SignInTest,
  signUpTest,
  editUserTest,
  deleteUser,
  createTestData,
  getUser,
  getUserById,
  searchUserByName,
  getCategories,
  createCategory,
  searchCategoriesByName,
  updateCategory,
} from './testSuite';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testingPort: number = 3333;

  beforeAll(async () => {
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
    describe('Signup', signUpTest);
    describe('Signin', SignInTest);
  });

  describe('User', () => {
    describe('Created user test data', createTestData);
    describe('Get me', getMeTest);
    describe('Edit User', editUserTest);
    describe('Delete User', deleteUser);
    describe('Get user', getUser);
    describe('Get user by ID', getUserById);
    describe('Search user by name', searchUserByName);
  });

  describe('Category', () => {
    describe('Get categories', getCategories);
    describe('Create category', createCategory);
    describe('Search category by name', searchCategoriesByName);
    describe('Update Category', updateCategory);
  });
});
