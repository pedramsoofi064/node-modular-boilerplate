// errorMapper.js
module.exports = (errors) => {
    return errors.map(item => {
        const handler = typeMap[item.messages.keyword];
        if (handler) {
            return handler(item);
        } else {
            return {
                key: item.path || item.messages.params?.missingProperty || 'unknown',
                message: {
                    fa: 'خطای نامشخص',
                    en: 'Unknown error'
                }
            };
        }
    });
}

const typeMap = {
    required: (error) => {
        const missingProperty = error.messages.params.missingProperty;
        return {
            key: missingProperty,
            message: {
                fa: `${keyTranslate[missingProperty] || missingProperty} الزامی است.`,
                en: error.messages.message
            }
        }
    },
    pattern: (error) => {
        return {
            key: error.path,
            message: {
                fa: '',
                en: `Invalid pattern for ${error.path}`
            }
        }
    }
}

const keyTranslate = {
    password: 'رمز عبور',
    phone: 'شماره موبایل'
}
