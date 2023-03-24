import * as pactum from 'pactum';

export const getJobs = () => {
  it('should get jobs', () => {
    return pactum.spec().get('/jobs').expectStatus(200);
  });
};
