import * as pactum from 'pactum';
import { testCreateJobData } from '../testData/testData';

export const createJob = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .post('/jobs')
      .withBody({ ...testCreateJobData, categoryId: '$S{categoryId}' })
      .expectStatus(401);
  });
  it('should create a Job', () => {
    return pactum
      .spec()
      .post('/jobs')
      .withBody({ ...testCreateJobData, categoryId: '$S{categoryId}' })
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(201)
      .stores('jobId', 'id');
  });
  it('should throw error 403 if Job already exists', () => {
    return pactum
      .spec()
      .post('/jobs')
      .withBody({ ...testCreateJobData, categoryId: '$S{categoryId}' })
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(403);
  });
  it('should throw error 400 if body is emty', () => {
    return pactum
      .spec()
      .post('/jobs')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(400);
  });
};
