import * as pactum from 'pactum';
import { testUpdateJobData } from '../testData/testData';

export const updateJob = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .patch('/jobs/{id}')
      .withPathParams('id', '$S{jobId}')
      .withBody(testUpdateJobData)
      .expectStatus(401);
  });
  it('should update Job', () => {
    return pactum
      .spec()
      .patch('/jobs/{id}')
      .withPathParams('id', '$S{jobId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .withBody(testUpdateJobData)
      .expectStatus(200);
  });
};
