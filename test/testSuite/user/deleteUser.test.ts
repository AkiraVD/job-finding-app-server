import * as pactum from 'pactum';

export const deleteUser = () => {
  it('should throw error if unauthorized', () => {
    return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .expectStatus(401);
  });
  it('should throw error if normal user try delete', () => {
    return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', '$S{deteleId}')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .expectStatus(401);
  });
  it('should throw error if delete user not found', () => {
    return pactum
      .spec()
      .delete('/user/99999999')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(404);
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
};
