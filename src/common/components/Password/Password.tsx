import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';

type PropsType = {
  label: string
  passError: boolean | '' | undefined
  formikErrorPass: string | undefined
}

export const Password = ({ label, passError, formikErrorPass, ...props }: PropsType) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <FormControl variant='standard' sx={{ m: 2 }}>
      <InputLabel color={passError ? 'error' : 'primary'}>
        {passError ? formikErrorPass : label}
      </InputLabel>

      <Input type={showPass ? 'text' : 'password'}
             error={!!passError}
             {...props}
             endAdornment={
               <InputAdornment position={'end'}>
                 <IconButton onClick={() => setShowPass(!showPass)}>
                   {
                     showPass
                       ? <VisibilityOff />
                       : <Visibility />
                   }
                 </IconButton>
               </InputAdornment>
             }
      />
    </FormControl>
  );
};
