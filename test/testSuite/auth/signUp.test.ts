import { testUserData } from '../../testData/testData';
import * as pactum from 'pactum';

export const signUpTest = () => {
  it('should signup', () => {
    return pactum
      .spec()
      .post('/auth/signup')
      .withBody(testUserData)
      .expectStatus(201);
  });
  it('should throw error 400 if email empty', () => {
    return pactum
      .spec()
      .post('/auth/signup')
      .withBody({
        password: testUserData.password,
      })
      .expectStatus(400);
  });
  it('should throw error 400 if password empty', () => {
    return pactum
      .spec()
      .post('/auth/signup')
      .withBody({
        email: testUserData.email,
      })
      .expectStatus(400);
  });
  it('should throw error 400 if body empty', () => {
    return pactum.spec().post('/auth/signup').expectStatus(400);
  });
};
