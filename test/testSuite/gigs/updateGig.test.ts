import * as pactum from 'pactum';
import { testUpdateGigData } from '../testData/testData';

export const updategig = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withBody(testUpdateGigData)
      .expectStatus(401);
  });
  it('should throw error 404 if jobId not found', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ jobId: '$S{deleteJobId}' })
      .expectStatus(404);
  });
  it('should update gig jobId', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ jobId: testUpdateGigData.jobId })
      .expectStatus(200);
  });
  it('should update gig title', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ title: testUpdateGigData.title })
      .expectStatus(200);
  });
  it('should update gig rate', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ rate: testUpdateGigData.rate })
      .expectStatus(200);
  });
  it('should update gig price', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ price: testUpdateGigData.price })
      .expectStatus(200);
  });
  it('should update gig description', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ description: testUpdateGigData.description })
      .expectStatus(200);
  });
  it('should update gig descShort', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ descShort: testUpdateGigData.descShort })
      .expectStatus(200);
  });
  it('should update gig stars', () => {
    return pactum
      .spec()
      .patch('/gigs/{id}')
      .withPathParams('id', '$S{gigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody({ stars: testUpdateGigData.stars })
      .expectStatus(200);
  });
};
