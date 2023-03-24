import * as pactum from 'pactum';
import { testEditUserData } from '../testData/testData';

export const editUserTest = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{userId}')
      .withBody({
        ...testEditUserData,
        password: '1234',
        skills: null,
        certifications: null,
      })
      .expectStatus(401);
  });
  it('should throw error 401 if user is unauthorized', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .withBody({
        ...testEditUserData,
        password: '1234',
        skills: null,
        certifications: null,
      })
      .expectStatus(401);
  });
  it('should throw error 404 if user Id not exist', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .withBody({
        ...testEditUserData,
        password: '1234',
        skills: null,
        certifications: null,
      })
      .expectStatus(401);
  });
  it('should update user infomation', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({
        ...testEditUserData,
        password: '1234',
        skills: null,
        certifications: null,
      })
      .expectStatus(200)
      .expectBodyContains(testEditUserData.fullname)
      .expectBodyContains(testEditUserData.email);
  });
  it('should edit change user password', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ password: testEditUserData.password })
      .expectStatus(200);
  });
  it('should change user skills and certifications and return type array', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({
        skills: testEditUserData.skills,
        certifications: testEditUserData.certifications,
      })
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        properties: {
          skills: { type: 'array' },
          certifications: { type: 'array' },
        },
      });
  });
  it('should not be able to edit role', () => {
    return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ role: 'ADMIN' })
      .expectJsonMatch({ role: 'USER' })
      .expectStatus(200);
  });
};
