import * as pactum from 'pactum';
import {
  testAdminData,
  testDeleteCategoryData,
  testDeleteCommentData,
  testDeleteGigData,
  testDeleteJobData,
  testDeleteUserData,
  testMainCategoryData,
  testMainGigData,
  testMainJobData,
  testMainUserData,
} from './testData';

export async function createTestData() {
  // create admin user
  await pactum
    .spec()
    .post('/auth/admin')
    .withBody(testAdminData)
    .stores('adminToken', 'access_token');

  // create main user
  await pactum
    .spec()
    .post('/auth/signup')
    .withBody(testMainUserData)
    .stores('mainToken', 'access_token');

  // create user to delete
  await pactum
    .spec()
    .post('/auth/signup')
    .withBody(testDeleteUserData)
    .stores('deleteToken', 'access_token');

  // store delete user data
  await pactum
    .spec()
    .get('/user/me')
    .withHeaders({
      Authorization: 'Bearer $S{deleteToken}',
    })
    .stores('deteleId', 'id');

  // create main category
  await pactum
    .spec()
    .post('/categories')
    .withBody(testMainCategoryData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .expectStatus(201)
    .stores('mainCategoryId', 'id');

  // create delete category data
  await pactum
    .spec()
    .post('/categories')
    .withBody(testDeleteCategoryData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('deteleCategoryId', 'id');

  // create main job
  await pactum
    .spec()
    .post('/jobs')
    .withBody(testMainJobData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('mainJobId', 'id');

  // create delete job data
  await pactum
    .spec()
    .post('/jobs')
    .withBody(testDeleteJobData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('deleteJobId', 'id');

  // create main gig data
  await pactum
    .spec()
    .post('/gigs')
    .withBody(testMainGigData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('mainGigId', 'id');

  // create delete gig data
  await pactum
    .spec()
    .post('/gigs')
    .withBody(testDeleteGigData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('deleteGigId', 'id');

  // create delete comment data
  await pactum
    .spec()
    .post('/comments')
    .withBody(testDeleteCommentData)
    .withHeaders({
      Authorization: 'Bearer $S{adminToken}',
    })
    .stores('deteleCommentId', 'id');

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

  // create 10 gigs data
  for (let i = 1; i <= 10; i++) {
    requests.push(
      pactum
        .spec()
        .post('/gigs/')
        .withBody({ jobId: '$S{mainJobId}', title: 'Gigs ' + i })
        .withHeaders({
          Authorization: 'Bearer $S{adminToken}',
        }),
    );
  }

  // create 10 orders data
  for (let i = 1; i <= 10; i++) {
    requests.push(
      pactum
        .spec()
        .post('/orders/')
        .withBody({ gigId: '$S{mainGigId}' })
        .withHeaders({
          Authorization: 'Bearer $S{mainToken}',
        }),
    );
  }

  // create 10 comment data
  for (let i = 1; i <= 10; i++) {
    requests.push(
      pactum
        .spec()
        .post('/comments/')
        .withBody({
          gigId: '$S{mainGigId}',
          content: `Comment ${i}`,
          star: i % 5,
        })
        .withHeaders({
          Authorization: 'Bearer $S{mainToken}',
        }),
    );
  }

  await Promise.all(requests);
}
