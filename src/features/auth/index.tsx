import {slice} from './reducer';
import * as authSelectors from './selectors'
import {asyncActions} from './reducer';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';
import { CreateNewPassword } from './CreateNewPassword/CreateNewPassword';
import { CheckEmail } from './CheckEmail/CheckEmail';

const authReducer = slice.reducer

const authActions = {
    ...asyncActions,
    ...slice.actions,
}

export {
    authReducer,
    authSelectors,
    authActions,
    SignIn,
    SignUp,
    ForgotPassword,
    CreateNewPassword,
    CheckEmail,
}