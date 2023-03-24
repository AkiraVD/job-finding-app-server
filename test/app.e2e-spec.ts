import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import {
  getMeTest,
  SignInTest,
  signUpTest,
  updateUserTest,
  deleteUser,
  getUser,
  getUserById,
  searchUserByName,
  getCategories,
  getCategoryById,
  createCategory,
  searchCategoriesByName,
  updateCategory,
  deleteCategories,
  createTestData,
  createJob,
  updateJob,
  deleteJob,
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

    await createTestData();
  });

  afterAll(() => {
    app.close();
  });

  // describe('Create test data', createTestData);

  describe('Auth', () => {
    describe('Signup', signUpTest);
    describe('Signin', SignInTest);
  });

  describe('User', () => {
    describe('Get me', getMeTest);
    describe('Update User', updateUserTest);
    describe('Delete User', deleteUser);
    describe('Get user', getUser);
    describe('Get user by ID', getUserById);
    describe('Search user by name', searchUserByName);
  });

  describe('Category', () => {
    describe('Create category', createCategory);
    describe('Update Category', updateCategory);
    describe('Delete Category', deleteCategories);
    describe('Get categories', getCategories);
    describe('Get category by Id', getCategoryById);
    describe('Search category by name', searchCategoriesByName);
  });

  describe('Jobs', () => {
    describe('Create job', createJob);
    describe('Update job', updateJob);
    describe('Delete job', deleteJob);
  });
});
