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

export const testUserData = {
  email: 'test@example.com',
  password: '1234',
};
export const testAdminData = {
  email: 'admin@example.com',
  password: '1234',
};
export const testEditUserData = {
  fullname: 'John Wich',
  email: 'john@example.com',
  birthday: '01/01/1990',
  phone: '1111111111',
  gender: 'male',
  password: '4321',
  skills: JSON.stringify(['a', 'b', 'c', 'd']),
  certifications: JSON.stringify(['a', 'b', 'c', 'd']),
};
export const testDeleteUserData = {
  email: 'delete@example.com',
  password: '1234',
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

export const testCreateJobData = {
  categoryId: '$S{jobId}',
  name: 'Testing Create Job',
};
export const testUpdateJobData = {
  name: 'Testing Update Job',
};
export const testDeleteJobData = {
  name: 'Testing Delete Job',
};
