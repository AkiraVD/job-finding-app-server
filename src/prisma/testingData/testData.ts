import { getRandomDate } from '../../utils';

export const userData = [];
for (let i = 1; i <= 20; i++) {
  userData.push({
    email: `testEmail${i}@gmail.com`,
    hash: 'testHash',
    fullname: `Test User ${i}`,
    birthday: getRandomDate(),
    phone: '123456789',
    gender: i % 2 == 1 ? 'male' : 'female',
  });
}

export const categoriesData = [];
for (let i = 1; i <= 20; i++) {
  categoriesData.push({
    name: `Category ${i}`,
  });
}
