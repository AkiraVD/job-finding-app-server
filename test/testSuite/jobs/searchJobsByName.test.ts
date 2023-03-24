import * as pactum from 'pactum';
import { like } from 'pactum-matchers';

export const searchJobsByName = () => {
  it('should get default first 10 jobs if fields is blank', () => {
    return pactum
      .spec()
      .get('/jobs/search')
      .expectStatus(200)
      .expectJsonLength('jobs', 10);
  });
  it('should find 1 job by name', () => {
    return pactum
      .spec()
      .get('/jobs/search')
      .withQueryParams('name', 'test')
      .expectStatus(200)
      .expectJsonLength('jobs', 1);
  });
  it('should get first 5 jobs', () => {
    return pactum
      .spec()
      .get('/jobs/search')
      .withQueryParams('item', '5')
      .expectStatus(200)
      .expectJsonLength('jobs', 5);
  });
  it('should get 3 jobs with same name on page 2', () => {
    return pactum
      .spec()
      .get('/jobs/search')
      .withQueryParams('name', 'Job')
      .withQueryParams('item', '3')
      .withQueryParams('page', '2')
      .expectStatus(200)
      .expectJsonLength('jobs', 3);
  });
};
