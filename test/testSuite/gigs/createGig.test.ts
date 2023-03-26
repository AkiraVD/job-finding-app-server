import * as pactum from 'pactum';
import { testCreateGigData, testUpdateGigData } from '../testData/testData';

export const createGig = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .post('/gigs')
      .withBody(testCreateGigData)
      .expectStatus(401);
  });
  it('should throw error 404 if Job not found', () => {
    return pactum
      .spec()
      .post('/gigs')
      .withBody({ jobId: '$S{deleteJobId}', title: 'test' })
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(404);
  });
  it('should create a Gig', () => {
    return pactum
      .spec()
      .post('/gigs')
      .withBody(testCreateGigData)
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(201)
      .stores('gigId', 'id');
  });
  it('should throw error 400 if body is emty', () => {
    return pactum
      .spec()
      .post('/gigs')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(400);
  });
};
