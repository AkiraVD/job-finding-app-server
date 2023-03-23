import * as pactum from 'pactum';

export const getMeTest = () => {
  it('should get current user', () => {
    return pactum
      .spec()
      .get('/user/me')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}',
      })
      .stores('userId', 'id')
      .expectStatus(200);
  });
};
