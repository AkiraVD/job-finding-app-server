import { testAdminData, testDeleteUserData } from '../../testData/testData';
import * as pactum from 'pactum';

export const createTestData = () => {
  it('create admin', () => {
    return pactum
      .spec()
      .post('/auth/admin')
      .withBody(testAdminData)
      .stores('adminToken', 'access_token')
      .inspect();
  });
  it('create user to detele', () => {
    return pactum
      .spec()
      .post('/auth/signup')
      .withBody(testDeleteUserData)
      .stores('deleteUserToken', 'access_token');
  });
  it('stored delete data', () => {
    return pactum
      .spec()
      .get('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{deleteUserToken}',
      })
      .stores('deteleId', 'id');
  });
};
