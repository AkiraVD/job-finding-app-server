import * as pactum from 'pactum';
import { testUpdateCategoryData } from '../../testData/testData';

export const updateCategory = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .patch('/categories/{id}')
      .withPathParams('id', '$S{categoryId}')
      .withBody(testUpdateCategoryData)
      .expectStatus(401);
  });
  it('should update category', () => {
    return pactum
      .spec()
      .patch('/categories/{id}')
      .withPathParams('id', '$S{categoryId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody(testUpdateCategoryData)
      .expectStatus(200)
      .inspect();
  });
};
