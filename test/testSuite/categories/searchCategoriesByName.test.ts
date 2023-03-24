import * as pactum from 'pactum';
import { like } from 'pactum-matchers';

export const searchCategoriesByName = () => {
  it('should get default first 10 categories if fields is blank', () => {
    return pactum
      .spec()
      .get('/categories/search')
      .expectStatus(200)
      .expectJsonLength('categories', 10);
  });
  it('should find 1 category by name', () => {
    return pactum
      .spec()
      .get('/categories/search')
      .withQueryParams('name', 'test')
      .expectStatus(200)
      .expectJsonLength('categories', 1);
  });
  it('should get first 5 categories', () => {
    return pactum
      .spec()
      .get('/categories/search')
      .withQueryParams('item', '5')
      .expectStatus(200)
      .expectJsonLength('categories', 5);
  });
  it('should get 3 categories with same name on page 2', () => {
    return pactum
      .spec()
      .get('/categories/search')
      .withQueryParams('name', 'Category')
      .withQueryParams('item', '3')
      .withQueryParams('page', '2')
      .expectStatus(200)
      .expectJsonLength('categories', 3);
  });
};
