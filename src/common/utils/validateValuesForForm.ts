type  FormValuesType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const validateValuesForForm = (values: FormValuesType) => {
    const errors: FormValuesType = {}

    //if (values.email !== undefined) {
        if (!values.email) {
            errors.email = 'email required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
    //}

    if (!values.password) {
        errors.password = 'password required';
    } else if (values.password.length < 3) {
        errors.password = 'The password is too short'
    } else if (values.password.length < 8) {
        errors.password = 'Put more then 8 symbols, please.'
    }

    if (values.confirmPassword !== undefined) {
        if (!values.confirmPassword) {
            errors.confirmPassword = 'password required';
        } else if (values.confirmPassword.length < 3) {
            errors.confirmPassword = 'The password is too short'
        } else if (values.confirmPassword.length < 8) {
            errors.confirmPassword = 'Put more then 8 symbols, please.'
        }
    }

    return errors
}
