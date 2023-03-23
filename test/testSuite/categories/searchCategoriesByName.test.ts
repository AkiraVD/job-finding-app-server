import * as pactum from 'pactum';

export const searchCategoriesByName = () => {
  it('should get default first 10 categories if fields is blank', () => {
    return pactum.spec().get('/categories/search').expectStatus(200);
  });
  it('should find categories by name', () => {
    return pactum
      .spec()
      .get('/categories/search')
      .withQueryParams('name', 'test')
      .expectStatus(200);
  });
};
