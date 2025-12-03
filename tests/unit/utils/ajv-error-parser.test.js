// errorMapper.test.js
const errorMapper = require('../../../src/utils/ajv-error-parser');

describe('errorMapper', () => {
    test('should map required errors correctly', () => {
        const errors = [
            {
                messages: {
                    keyword: 'required',
                    message: 'is a required field',
                    params: {
                        missingProperty: 'password'
                    }
                }
            },
            {
                messages: {
                    keyword: 'required',
                    message: 'is a required field',
                    params: {
                        missingProperty: 'phone'
                    }
                }
            }
        ];
        const expectedOutput = [
            {
                key: 'password',
                message: {
                    fa: 'رمز عبور الزامی است.',
                    en: 'is a required field'
                }
            },
            {
                key: 'phone',
                message: {
                    fa: 'شماره موبایل الزامی است.',
                    en: 'is a required field'
                }
            }
        ];
        expect(errorMapper(errors)).toEqual(expectedOutput);
    });

    test('should map pattern errors correctly', () => {
        const errors = [
            {
                path: 'phone',
                messages: {
                    keyword: 'pattern',
                }
            }
        ];
        const expectedOutput = [
            {
                key: 'phone',
                message: {
                    fa: '',
                    en: 'Invalid pattern for phone'
                }
            }
        ];
        expect(errorMapper(errors)).toEqual(expectedOutput);
    });

    test('should handle unknown keyword gracefully', () => {
        const errors = [
            {
                path: 'username',
                messages: {
                    keyword: 'unknown_keyword',
                }
            }
        ];
        const expectedOutput = [
            {
                key: 'username',
                message: {
                    fa: 'خطای نامشخص',
                    en: 'Unknown error'
                }
            }
        ];
        expect(errorMapper(errors)).toEqual(expectedOutput);
    });

    test('should handle missing path and missingProperty gracefully', () => {
        const errors = [
            {
                messages: {
                    keyword: '',
                    message: 'is a required field',
                    params: {}
                }
            }
        ];
        const expectedOutput = [
            {
                key: 'unknown',
                message: {
                    fa: 'خطای نامشخص',
                    en: 'Unknown error'
                }
            }
        ];
        expect(errorMapper(errors)).toEqual(expectedOutput);
    });
});
