/**
 * User Service Example
 * Demonstrates using the Bridge pattern to access other module services
 */

const { User } = require('../../db/models');
const { bridge } = require('../../core');
const { NotFoundError } = require('../../utils/api-errors');

const UserService = {
  /**
   * Get user by ID
   * @async
   * @param {number} userId - User ID
   * @returns {Promise<Object>} User object
   * @throws {NotFoundError} If user is not found
   */
  getUserById: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  },

  /**
   * Example: Using AuthService from bridge instead of direct import
   * This demonstrates decoupled module communication
   * @async
   * @param {string} phone - User phone number
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result
   */
  loginViaBridge: async (phone, password) => {
    // Get AuthService from bridge instead of direct import
    const AuthService = bridge.get('auth', 'AuthService');
    return AuthService.doLogin({ phone, password });
  },

  /**
   * Example: Using JwtService from bridge
   * @async
   * @param {Object} payload - JWT payload
   * @returns {Promise<string>} JWT token
   */
  generateTokenViaBridge: async (payload) => {
    const JwtService = bridge.get('auth', 'JwtService');
    return JwtService.generateJWT({ payload });
  },
};

module.exports = UserService;

