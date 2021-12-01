import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ControllerDecorator } from '@utils/decorator';
import { signInApiOperation, signOutApiBody, signOutApiOperation } from '../swagger';
import { AuthDto } from '../dto/auth.dto';

export const _AuthController = () => {
    return applyDecorators(
        ControllerDecorator('auth', '인증 컨트롤러'),
    );
};

const BaseDecorator = (operation, body) => {
    return applyDecorators(
        ApiOperation(operation),
        ApiBody(body),
    );
};

export const SignInApi = () => {
    return applyDecorators(
        BaseDecorator(
            signInApiOperation,
            { type: AuthDto },
        ),
    );
};

export const SignOutApi = () => {
    return applyDecorators(
        BaseDecorator(
            signOutApiOperation,
            signOutApiBody,
        ),
    );
};
