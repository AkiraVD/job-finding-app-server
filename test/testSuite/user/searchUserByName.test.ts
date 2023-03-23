import * as pactum from 'pactum';
import { like } from 'pactum-matchers';

export const searchUserByName = () => {
  it('should get default 10 users if the field is blank', () => {
    return pactum
      .spec()
      .get('/user/search')
      .expectStatus(200)
      .expectJsonLength('users', 10);
  });
  it('should get default 10 users by same name', () => {
    return pactum
      .spec()
      .get('/user/search')
      .withQueryParams('name', 'test')
      .expectStatus(200)
      .expectJsonLength('users', 10)
      .expectJsonMatch('users[0].fullname', like('test'));
  });
  it('should get first 5 users by same name', () => {
    return pactum
      .spec()
      .get('/user/search')
      .withQueryParams('name', 'test')
      .withQueryParams('item', '5')
      .expectStatus(200)
      .expectJsonLength('users', 5)
      .expectJsonMatch('users[0].fullname', like('test'));
  });
  it('should get 3 users on page 2 by same name', () => {
    return pactum
      .spec()
      .get('/user/search')
      .withQueryParams('name', 'test')
      .withQueryParams('item', '3')
      .withQueryParams('page', '2')
      .expectStatus(200)
      .expectJsonLength('users', 3)
      .expectJsonMatch('users[0].fullname', like('test'));
  });
};
