import * as pactum from 'pactum';

export const deleteGig = () => {
  it('should throw error 401 if unauthorized', () => {
    return pactum
      .spec()
      .delete('/gigs/{id}')
      .withPathParams('id', '$S{deleteGigId}')
      .expectStatus(401);
  });
  it('should delete Gig', () => {
    return pactum
      .spec()
      .delete('/gigs/{id}')
      .withPathParams('id', '$S{deleteGigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(200);
  });
  it('should thrrow if Gig not exists', () => {
    return pactum
      .spec()
      .delete('/gigs/{id}')
      .withPathParams('id', '$S{deleteGigId}')
      .withHeaders({
        Authorization: 'Bearer $S{adminToken}',
      })
      .expectStatus(404);
  });
};
