import * as pactum from 'pactum';
import { testCreateUserData } from '../testData/testData';

export const createUserTest = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum.spec().post('/user/').expectStatus(401);
  });
  it('should throw error 401 if user is unauthorized', () => {
    return pactum
      .spec()
      .post('/user/')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .withBody(testCreateUserData)
      .expectStatus(401);
  });
  it('should throw error 400 if email or password is missing', () => {
    return pactum
      .spec()
      .post('/user/')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(400);
  });
  it('should create user', () => {
    return pactum
      .spec()
      .post('/user/')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody(testCreateUserData)
      .expectStatus(201)
      .expectBodyContains(testCreateUserData.fullname)
      .expectBodyContains(testCreateUserData.email)
      .expectBodyContains(testCreateUserData.birthday)
      .expectBodyContains(testCreateUserData.gender)
      .expectBodyContains(testCreateUserData.skills)
      .expectBodyContains(testCreateUserData.certifications)
      .expectJsonSchema({
        type: 'object',
        properties: {
          skills: { type: 'array' },
          certifications: { type: 'array' },
        },
      });
  });
  it('should throw error 403 if email already exists', () => {
    return pactum
      .spec()
      .post('/user/')
      .withBody(testCreateUserData)
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(403);
  });
};
