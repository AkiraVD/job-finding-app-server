import * as pactum from 'pactum';

export const getAllUsers = () => {
  it('should get all users', () => {
    return pactum.spec().get('/user').expectStatus(200);
  });
};
