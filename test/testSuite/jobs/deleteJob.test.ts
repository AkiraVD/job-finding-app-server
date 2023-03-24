import * as pactum from 'pactum';

export const deleteJob = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .delete('/jobs/{id}')
      .withPathParams('id', '$S{deteleJobId}')
      .expectStatus(401);
  });
  it('should delete job', () => {
    return pactum
      .spec()
      .delete('/jobs/{id}')
      .withPathParams('id', '$S{deteleJobId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(200);
  });
  it('should thrrow if job not exists', () => {
    return pactum
      .spec()
      .delete('/jobs/{id}')
      .withPathParams('id', '$S{deteleJobId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(404);
  });
};
