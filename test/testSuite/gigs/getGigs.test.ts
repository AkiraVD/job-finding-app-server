import * as pactum from 'pactum';

export const getGigs = () => {
  it('should get gigs', () => {
    return pactum.spec().get('/gigs').expectStatus(200);
  });
};
