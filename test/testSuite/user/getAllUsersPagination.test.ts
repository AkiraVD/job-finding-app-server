import * as pactum from 'pactum';

export const getAllUsersPagination = () => {
  it('should get default first 10 users', () => {
    return pactum
      .spec()
      .get('/user/pagination')
      .expectStatus(200)
      .expectJsonLength('users', 10);
  });
  it('should get first 5 users', () => {
    return pactum
      .spec()
      .get('/user/pagination')
      .withQueryParams('item', '5')

      .expectStatus(200)
      .expectJsonLength('users', 5);
  });
  it('should get 6 users on 2nd page', () => {
    return pactum
      .spec()
      .get('/user/pagination')
      .withQueryParams('item', '6')
      .withQueryParams('page', '2')
      .expectStatus(200)
      .expectJsonLength('users', 6);
  });
};
