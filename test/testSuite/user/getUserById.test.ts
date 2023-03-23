import * as pactum from 'pactum';

export const getUserById = () => {
  it('should get user by ID', () => {
    return pactum
      .spec()
      .get('/user/id={id}')
      .withPathParams('id', '$S{userId}')
      .expectStatus(200);
  });
  it('should throw error 404 if userID not found', () => {
    return pactum
      .spec()
      .get('/user/id={id}')
      .withPathParams('id', '$S{deteleId}')
      .expectStatus(404);
  });
};
