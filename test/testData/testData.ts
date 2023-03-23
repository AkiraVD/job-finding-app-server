import { AuthDto } from '../../src/auth/dto';
import { CreateCategoryDto } from '../../src/categories/dto';
import { EditUserDto } from '../../src/user/dto';

export const testUserData: AuthDto = {
  email: 'test@example.com',
  password: '1234',
};
export const testAdminData: AuthDto = {
  email: 'admin@example.com',
  password: '1234',
};
export const testEditUserData: EditUserDto = {
  fullname: 'John Wich',
  email: 'john@example.com',
  birthday: '01/01/1990',
  phone: '1111111111',
  gender: 'male',
  password: '4321',
  skills: JSON.stringify(['a', 'b', 'c', 'd']),
  certifications: JSON.stringify(['a', 'b', 'c', 'd']),
};
export const testDeleteUserData: AuthDto = {
  email: 'delete@example.com',
  password: '1234',
};
export const testCreateCategoryData: CreateCategoryDto = {
  name: 'Testing Create Catelogies',
};
export const testUpdateCategoryData: CreateCategoryDto = {
  name: 'Testing Update Catelogies',
};
