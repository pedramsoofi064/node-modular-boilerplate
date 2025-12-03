const bcrypt = require('bcryptjs');

const { faker } = require('@faker-js/faker');

const AuthService = require('../../../../src/modules/auth/auth.service');
const JwtService = require('../../../../src/modules/auth/jwt.service');
const { NotFoundError, BadRequestError } = require('../../../../src/utils/api-errors');
const { User } = require('../../../../src/db/models');

jest.mock('../../../../src/db/models', () => {
  const User = {
    findOne: jest.fn().mockResolvedValue({ id: 'fake-id', role: 'fake-role' })
  };
  return { User };
});

describe('AuthService', () => {
  describe('login', () => {
    it('should login user and return token', async () => {
      // Arrange
      expect.assertions(1);
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8)
      };
      const fakeUser = {
        userId: 'fake-id',
        role: 'fake-role'
      };
      const fakeAccessToken = 'fake-access-token';
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);
      jest.spyOn(JwtService, 'generateJWT').mockResolvedValue(fakeAccessToken);

      const expected = {
        ...fakeUser,
        accessToken: fakeAccessToken
      };

      // Act
      const result = await AuthService.doLogin(requestBody);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundError if user is not found', async () => {
      // Arrange
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8),
      };

      // Mock User.findOne to return null
      User.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(AuthService.doLogin(requestBody)).rejects.toThrow(NotFoundError);
    });

    it('should throw BadRequestError if password is invalid', async () => {
      // Arrange
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8),
      };
      const fakeUser = {
        id: 'fake-id',
        role: 'fake-role',
        password: 'hashed-password',
      };

      // Mock User.findOne to return a fake user
      User.findOne.mockResolvedValue(fakeUser);

      // Mock bcrypt.compareSync to return false
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      // Act & Assert
      await expect(AuthService.doLogin(requestBody)).rejects.toThrow(BadRequestError);
    });
  });
});
