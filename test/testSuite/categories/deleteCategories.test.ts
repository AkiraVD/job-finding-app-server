import * as pactum from 'pactum';

export const deleteCategories = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .delete('/categories/{id}')
      .withPathParams('id', '$S{deteleCategoryId}')
      .expectStatus(401);
  });
  it('should delete catelogy', () => {
    return pactum
      .spec()
      .delete('/categories/{id}')
      .withPathParams('id', '$S{deteleCategoryId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(200);
  });
  it('should thrrow if catelogy not exists', () => {
    return pactum
      .spec()
      .delete('/categories/{id}')
      .withPathParams('id', '$S{deteleCategoryId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(404);
  });
};
