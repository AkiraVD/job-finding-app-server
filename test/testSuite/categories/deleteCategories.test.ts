import * as pactum from 'pactum';
import { testDeleteCategoryData } from '../../testData/testData';

export const deleteCategories = () => {
  it('create delete data', () => {
    return pactum
      .spec()
      .post('/categories')
      .withBody(testDeleteCategoryData)
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .stores('deteleCategoryId', 'id')
      .expectStatus(201);
  });
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
