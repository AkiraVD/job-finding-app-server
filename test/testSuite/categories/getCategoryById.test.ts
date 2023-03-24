import * as pactum from 'pactum';

export const getCategoryById = () => {
  it('should get category by Id', () => {
    return pactum
      .spec()
      .get('/categories/id={id}')
      .withPathParams('id', '$S{categoryId}')
      .expectStatus(200);
  });
  it('should throw error 404 if category Id not found', () => {
    return pactum
      .spec()
      .get('/categories/id={id}')
      .withPathParams('id', '$S{deteleCategoryId}')
      .expectStatus(404);
  });
};
