import { testUserData } from '../../testData/testData';
import * as pactum from 'pactum';

export const SignInTest = () => {
  it('should signin', () => {
    return pactum
      .spec()
      .post('/auth/signin')
      .withBody(testUserData)
      .expectStatus(200)
      .stores('userToken', 'access_token');
  });
  it('should throw error 400 if email empty', () => {
    return pactum
      .spec()
      .post('/auth/signin')
      .withBody({
        password: testUserData.password,
      })
      .expectStatus(400);
  });
  it('should throw error 400 if password empty', () => {
    return pactum
      .spec()
      .post('/auth/signin')
      .withBody({
        email: testUserData.email,
      })
      .expectStatus(400);
  });
  it('should throw error 400 if body empty', () => {
    return pactum.spec().post('/auth/signin').expectStatus(400);
  });
};
