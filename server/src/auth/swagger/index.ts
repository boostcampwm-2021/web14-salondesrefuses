export const signInApiOperation = {
    summary: '로그인 API',
    description: 'google, kakao 회원가입 및 로그인을 담당합니다.',
};

export const signInApiBody = {
    schema: {
        type: 'object',
        properties: {
            code: { type: 'string', nullable: false },
            strategy: { type: 'string', nullable: false },
        },
    },
};

export const signOutApiOperation = {
    summary: '로그아웃 API',
    description: '로그아웃을 담당합니다.'
};

export const signOutApiBody = {
    schema: {
        type: 'object',
        properties: {
            userId: { type: 'string', nullable: false }
        },
    },
};
