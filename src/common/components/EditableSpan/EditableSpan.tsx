import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import pen from '../../assets/images/pen.png';

import style from './EditableSpan.module.scss';

type PropsType = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const EditableSpan = ({ value, className, onChange }: PropsType): ReactElement => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [error, setError] = useState('');

  const valueChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setCurrentValue(e.currentTarget.value);
  };

  const deactivatedEditMode = (): void => {
    if (currentValue) {
      setIsEditingMode(false);
      onChange(currentValue);
      setError('');
    } else {
      setError('field is required');
    }
  };

  const activeEditMode = (): void => {
    setIsEditingMode(true);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return isEditingMode ? (
    <TextField
      defaultValue={currentValue}
      placeholder={error || 'name'}
      onBlur={deactivatedEditMode}
      onKeyUp={e => e.key === 'Enter' && deactivatedEditMode()}
      autoFocus
      onChange={valueChangeHandler}
      className={className}
      error={!!error}
      variant="standard"
    />
  ) : (
    <span onDoubleClick={activeEditMode} className={style.text}>
      {value}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <img src={pen} alt="pen" className={style.penImg} onClick={activeEditMode} />
    </span>
  );
};
