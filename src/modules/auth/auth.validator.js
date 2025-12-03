

module.exports = {
  /**
   * Validates a login request.
   * @param {object} httpRequest - The HTTP request object.
   * @param {object} httpRequest.body - The request body.
   * @param {string} httpRequest.body.phone - The phone number to validate.
   * @param {string} httpRequest.body.password - The password to validate.
   * @returns {object} - The validation result.
   */
  validateLogin: {
    type: "object",
    properties: {
      phone: {
        type: "string",
        pattern: "^(09)[0-9]{9}$|^(۰۹)[۰۱۲۳۴۵۶۷۸۹]{9}$|^(٠٩)[٩٨٧٦٥٤٣٢١٠]{9}$", 
      },
      password: {
        type: "string",
      },
    },
    required: ["phone" , 'password'],
    additionalProperties: false,
  },
};
