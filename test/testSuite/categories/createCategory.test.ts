import * as pactum from 'pactum';
import { testCreateCategoryData } from '../../testData/testData';

export const createCategory = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .post('/categories')
      .withBody(testCreateCategoryData)
      .expectStatus(401);
  });
  it('should create a category', () => {
    return pactum
      .spec()
      .post('/categories')
      .withBody(testCreateCategoryData)
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(201)
      .stores('categoryId', 'id');
  });
  it('should throw error 403 if category already exists', () => {
    return pactum
      .spec()
      .post('/categories')
      .withBody(testCreateCategoryData)
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(403);
  });
  it('should throw error 400 if body is emty', () => {
    return pactum
      .spec()
      .post('/categories')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(400);
  });
};
