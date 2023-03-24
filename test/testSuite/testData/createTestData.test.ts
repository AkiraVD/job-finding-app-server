import * as pactum from 'pactum';
import {
  testAdminData,
  testDeleteCategoryData,
  testDeleteJobData,
  testDeleteUserData,
} from './testData';

export async function createTestData() {
  // create admin user
  await pactum
    .spec()
    .post('/auth/admin')
    .withBody(testAdminData)
    .stores('adminToken', 'access_token');

  // create main category
  await pactum
    .spec()
    .post('/categories')
    .withBody({
      name: 'Main category',
    })
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .expectStatus(201)
    .stores('mainCategoryId', 'id');

  // create user to delete
  await pactum
    .spec()
    .post('/auth/signup')
    .withBody(testDeleteUserData)
    .stores('deleteUserToken', 'access_token');

  // store delete data
  await pactum
    .spec()
    .get('/user/me')
    .withHeaders({
      Authorization: 'Bearer $S{deleteUserToken}',
    })
    .stores('deteleId', 'id');

  // create delete data for category
  await pactum
    .spec()
    .post('/categories')
    .withBody(testDeleteCategoryData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('deteleCategoryId', 'id');

  // create delete data for job
  await pactum
    .spec()
    .post('/jobs')
    .withBody({ ...testDeleteJobData, categoryId: '$S{mainCategoryId}' })
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('deteleJobId', 'id');

  const requests = [];

  // create 10 categories data
  for (let i = 1; i <= 10; i++) {
    requests.push(
      pactum
        .spec()
        .post('/categories/')
        .withBody({ name: 'Category ' + i })
        .withHeaders({
          Authorization: 'Bearer $S{adminToken}',
        }),
    );
  }

  // create 10 jobs data
  for (let i = 1; i <= 10; i++) {
    requests.push(
      pactum
        .spec()
        .post('/jobs/')
        .withBody({ categoryId: '$S{mainCategoryId}', name: 'Jobs ' + i })
        .withHeaders({
          Authorization: 'Bearer $S{adminToken}',
        }),
    );
  }

  await Promise.all(requests);
}
