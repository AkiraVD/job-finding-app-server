import * as pactum from 'pactum';

export const getJobById = () => {
  it('should get job by Id', () => {
    return pactum
      .spec()
      .get('/jobs/id={id}')
      .withPathParams('id', '$S{jobId}')
      .expectStatus(200);
  });
  it('should throw error 404 if job Id not found', () => {
    return pactum
      .spec()
      .get('/jobs/id={id}')
      .withPathParams('id', '$S{deteleJobId}')
      .expectStatus(404);
  });
};
