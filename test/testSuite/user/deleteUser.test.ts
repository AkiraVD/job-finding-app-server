import * as pactum from 'pactum';

export const deleteUser = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .expectStatus(401);
  });
  it('should throw error 401 if normal user try delete', () => {
    return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .expectStatus(401);
  });
  it('should delete user', () => {
    return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(200);
  });
  it('should throw error 404 if delete user not found', () => {
    return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(404);
  });
};
