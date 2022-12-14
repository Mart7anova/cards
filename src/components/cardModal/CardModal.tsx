import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import style from 'components/cardModal/CardModal.module.scss';
import { BasicModal, UploadFile } from 'components/common';

type PropsType = {
  title: string;
  sentChanges: (question: string, answer: string, questionImg: string) => void;
  open: boolean;
  closeModal: () => void;
  cardQuestion?: string;
  cardAnswer?: string;
  questionImg?: string;
};

type FormatType = 'text' | 'img';

export const CardModal = ({
  title,
  sentChanges,
  open,
  closeModal,
  cardQuestion,
  cardAnswer,
  questionImg,
}: PropsType): ReactElement => {
  const [format, setFormat] = useState<FormatType>(questionImg ? 'img' : 'text');
  const [question, setQuestion] = useState(cardQuestion || '');
  const [answer, setAnswer] = useState(cardAnswer || '');
  const [file, setFile] = useState(questionImg || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cardQuestion) setQuestion(cardQuestion);
    if (cardAnswer) setAnswer(cardAnswer);
    if (questionImg) setFile(questionImg);
  }, [cardQuestion, cardAnswer, questionImg]);

  const formatChangeHandler = (e: SelectChangeEvent): void => {
    setFormat(e.target.value as FormatType);
  };

  const questionChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setError('');
    setQuestion(e.currentTarget.value);
  };

  const answerChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setError('');
    setAnswer(e.currentTarget.value);
  };

  const textFormSendHandler = (): void => {
    if ((question && answer) || (file && answer)) {
      const newQuestion = question.trim() === '' ? 'no question' : question.trim();
      const newAnswer = answer.trim();

      sentChanges(newQuestion, newAnswer, file);

      setFormat('text');
      setQuestion('');
      setAnswer('');
      setFile('');
      setError('');
    } else {
      setError('required field');
    }
  };

  return (
    <BasicModal open={open} closeModal={closeModal} title={title}>
      <div className={style.infoText}>Choose a question format</div>

      <FormControl fullWidth size="small" className={style.formSelect}>
        <Select value={format} onChange={formatChangeHandler}>
          <MenuItem value="text">text</MenuItem>
          <MenuItem value="img">img</MenuItem>
        </Select>
      </FormControl>

      {format === 'img' && (
        <UploadFile file={file} setFile={setFile} titleForBtn="an image for a question" />
      )}

      <div className={style.infoText}>
        Question:
        {error && <span className={style.errorText}>{error}</span>}
      </div>

      <TextField
        variant="standard"
        value={question === 'no question' ? '' : question}
        onChange={questionChangeHandler}
        error={!!error}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <div className={style.infoText}>
        Answer:
        {error && <span className={style.errorText}> {error}</span>}
      </div>

      <TextField
        variant="standard"
        className={style.input}
        value={answer}
        onChange={answerChangeHandler}
        error={!!error}
        style={{ width: '100%', marginBottom: '30px' }}
      />

      <div className={style.buttonGroup}>
        <Button onClick={closeModal} variant="contained" color="error">
          Cansel
        </Button>

        <Button onClick={textFormSendHandler} variant="contained">
          {title.split(' ')[0]}
        </Button>
      </div>
    </BasicModal>
  );
};
