import * as pactum from 'pactum';
import { testEditUserData } from '../testData/testData';

export const updateMeTest = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .patch('/user/me')
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
      .patch('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
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
      .patch('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .withBody({ password: testEditUserData.password })
      .expectStatus(200);
  });
  it('should change user skills and certifications and return type array', () => {
    return pactum
      .spec()
      .patch('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
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
      .patch('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .withBody({ role: 'ADMIN' })
      .expectJsonMatch({ role: 'USER' })
      .expectStatus(200);
  });
};
