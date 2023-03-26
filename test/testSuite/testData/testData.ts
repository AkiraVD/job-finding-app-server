import { getRandomDate } from '../../../src/utils';

export const userData = [];
for (let i = 1; i <= 20; i++) {
  userData.push({
    email: `testEmail${i}@example.com`,
    hash: 'testHash',
    fullname: `Test User ${i}`,
    birthday: getRandomDate(),
    phone: '123456789',
    gender: i % 2 == 1 ? 'male' : 'female',
  });
}
// User data
export const testAdminData = {
  email: 'admin@example.com',
  password: '1234',
};
export const testMainUserData = {
  email: 'main@example.com',
  password: '1234',
};
export const testUserData = {
  email: 'test@example.com',
  password: '1234',
};
export const testCreateUserData = {
  fullname: 'John Snow',
  email: 'john-snow@example.com',
  birthday: '01/01/1990',
  phone: '222222222',
  gender: 'male',
  password: '1234',
  skills: ['1', '2', '3', '4'],
  certifications: ['1', '2', '3', '4'],
};
export const testEditUserData = {
  fullname: 'John Wich',
  email: 'john-wich@example.com',
  birthday: '01/01/1990',
  phone: '1111111111',
  gender: 'male',
  password: '4321',
  skills: ['a', 'b', 'c', 'd'],
  certifications: ['a', 'b', 'c', 'd'],
};
export const testDeleteUserData = {
  email: 'delete@example.com',
  password: '1234',
};

// Categories data
export const testMainCategoryData = {
  name: 'Testing Main Catelogy',
};
export const testCreateCategoryData = {
  name: 'Testing Create Catelogy',
};
export const testUpdateCategoryData = {
  name: 'Testing Update Catelogy',
};
export const testDeleteCategoryData = {
  name: 'Testing Delete Catelogy',
};

// Jobs data
export const testMainJobData = {
  categoryId: '$S{mainCategoryId}',
  name: 'Testing Main Job',
};
export const testCreateJobData = {
  categoryId: '$S{mainCategoryId}',
  name: 'Testing Create Job',
};
export const testDeleteJobData = {
  categoryId: '$S{mainCategoryId}',
  name: 'Testing Delete Job',
};
export const testUpdateJobData = {
  name: 'Testing Update Job',
};

// Gigs data
export const testMainGigData = {
  jobId: '$S{mainJobId}',
  title: 'Testing Main Gig',
};
export const testCreateGigData = {
  jobId: '$S{mainJobId}',
  title: 'Testing Create Gig',
};
export const testDeleteGigData = {
  jobId: '$S{mainJobId}',
  title: 'Testing Delete Gig',
};
export const testUpdateGigData = {
  jobId: '$S{jobId}',
  title: 'Testing Update Gig',
  rate: 5,
  price: 500,
  description: 'Testing description',
  descShort: 'Short description',
  stars: 5,
};

// Comments data
export const testCreateCommentData = {
  gigId: '$S{mainGigId}',
  content: 'Testing Create Comment',
  star: 1,
};
export const testDeleteCommentData = {
  gigId: '$S{mainGigId}',
  content: 'Testing Delete Comment',
  star: 1,
};
export const testUpdateCommentData = {
  content: 'Testing Update Comment',
  star: 5,
};

// Oders data
export const testCreateOrderData = {
  gigId: '$S{mainGigId}',
};
export const testDeleteOrderData = {
  gigId: '$S{mainGigId}',
};
