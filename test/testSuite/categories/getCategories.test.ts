import * as pactum from 'pactum';

export const getCategories = () => {
  it('should get categories', () => {
    return pactum.spec().get('/categories').expectStatus(200);
  });
};
