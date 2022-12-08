import React, { ChangeEvent, useEffect, useState } from 'react';
import pen from '../../assets/images/pen.png';
import style from './EditableSpan.module.scss';
import { TextField } from '@mui/material';

type PropsType = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const EditableSpan = (props: PropsType) => {
  const [value, setValue] = useState(props.value);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [error, setError] = useState('');

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  const deactivatedEditMode = () => {
    if (value) {
      setIsEditingMode(false);
      props.onChange(value);
      setError('');
    } else {
      setError('field is required');
    }
  };

  const activeEditMode = () => {
    setIsEditingMode(true);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      {
        isEditingMode
          ? <TextField defaultValue={value}
                       placeholder={error ? error : 'name'}
                       onBlur={deactivatedEditMode}
                       onKeyUp={e => e.key === 'Enter' && deactivatedEditMode()}
                       autoFocus
                       onChange={valueChangeHandler}
                       className={props.className}
                       error={!!error}
                       variant={'standard'}
          />
          : <span onDoubleClick={activeEditMode} className={style.text}>
                        {props.value}
            <img src={pen} alt={'pen'} className={style.penImg} onClick={activeEditMode} />
                      </span>
      }
    </>
  )
    ;
};
