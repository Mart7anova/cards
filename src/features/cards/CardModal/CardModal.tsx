import {Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal} from '../../../common/components/BasicModal/BasicModal';
import style from './CardModal.module.scss'
import {UploadFile} from '../../../common/components/UploadFile/UploadFile';


type PropsType = {
    title: string
    sentChanges: (question: string, answer: string, questionImg: string) => void
    open: boolean
    closeModal: () => void
    cardQuestion?: string
    cardAnswer?: string
    questionImg?: string
}

type FormatType = 'text' | 'img'

export const CardModal = ({title, sentChanges, open, closeModal, cardQuestion, cardAnswer, questionImg}: PropsType) => {
    const [format, setFormat] = useState<FormatType>(questionImg ? 'img' : 'text')
    const [question, setQuestion] = useState(cardQuestion ? cardQuestion : '')
    const [answer, setAnswer] = useState(cardAnswer ? cardAnswer : '')
    const [file, setFile] = useState(questionImg ? questionImg : '')
    const [error, setError] = useState('')

    const formatChangeHandler = (e: SelectChangeEvent) => {
        setFormat(e.target.value as FormatType)
    }

    const questionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError('')
        setQuestion(e.currentTarget.value)
    }
    const answerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError('')
        setAnswer(e.currentTarget.value)
    }

    const textFormSendHandler = () => {
        if ((question && answer) || (file && answer)) {
            const newQuestion = question.trim() === '' ? 'no question' : question.trim()
            const newAnswer = answer.trim()
            sentChanges(newQuestion, newAnswer, file)

            setFormat('text')
            setQuestion('')
            setAnswer('')
            setFile('')
            setError('')
        } else {
            setError('required field')
        }
    }

    useEffect(() => {
        if (cardQuestion) setQuestion(cardQuestion)
        if (cardAnswer) setAnswer(cardAnswer)
        if (questionImg) setFile(questionImg)
    }, [cardQuestion, cardAnswer, questionImg])

    return (
        <BasicModal open={open} closeModal={closeModal} title={title}>
            <div className={style.infoText}>Choose a question format</div>

            <FormControl fullWidth size={'small'} className={style.formSelect}>
                <Select value={format} onChange={formatChangeHandler}>
                    <MenuItem value={'text'}>text</MenuItem>
                    <MenuItem value={'img'}>img</MenuItem>
                </Select>
            </FormControl>

            {
                format === 'img' && <UploadFile file={file} setFile={setFile} titleForBtn={'an image for a question'}/>
            }

            <div className={style.infoText}>
                Question:
                {
                    error && <span className={style.errorText}>{error}</span>}
            </div>

            <TextField variant={'standard'}
                       value={question === 'no question' ? '' : question}
                       onChange={questionChangeHandler}
                       error={!!error}
                       style={{width: '100%', marginBottom: '10px'}}/>

            <div className={style.infoText}>
                Answer:
                {
                    error && <span className={style.errorText}> {error}</span>
                }
            </div>

            <TextField variant={'standard'}
                       className={style.input}
                       value={answer}
                       onChange={answerChangeHandler}
                       error={!!error}
                       style={{width: '100%', marginBottom: '30px'}}
            />

            <div className={style.btnGroup}>
                <Button onClick={closeModal} variant={'contained'} color={'error'}>
                    Cansel
                </Button>

                <Button onClick={textFormSendHandler} variant={'contained'}>
                    {title.split(' ')[0]}
                </Button>
            </div>
        </BasicModal>
    );
};
