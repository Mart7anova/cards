type FormValuesType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const MIN_LENGTH = 8;

export const validateValuesForForm = (values: FormValuesType): FormValuesType => {
  const errors: FormValuesType = {};

  if (values.email !== undefined) {
    if (!values.email) {
      errors.email = 'email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  }

  if (values.password !== undefined) {
    if (!values.password) {
      errors.password = 'password required';
    } else if (values.password.length < MIN_LENGTH) {
      errors.password = 'Put more then 8 symbols, please.';
    }
  }

  if (values.confirmPassword !== undefined) {
    if (!values.confirmPassword) {
      errors.confirmPassword = 'password required';
    } else if (values.confirmPassword.length < MIN_LENGTH) {
      errors.confirmPassword = 'Put more then 8 symbols, please.';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password not matched';
    }
  }

  return errors;
};
