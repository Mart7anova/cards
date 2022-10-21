import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Container, FormControlLabel, Paper, Radio, RadioGroup} from '@mui/material';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getCards, getCardsStatus, getPackName} from '../selectors';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {cardActions} from '../index';
import {CardType} from '../../../api/cardsApi';
import {getRandomCard} from '../../../common/utils/getCardRamdom';
import s from './Learn.module.scss'

const {fetchCards, updateCardGrade} = cardActions

const grades = [
    {title: 'Did not know', value: 1,},
    {title: 'Forgot', value: 2,},
    {title: 'A lot of thought', value: 3,},
    {title: 'Confused', value: 4,},
    {title: 'Knew the answer', value: 5,},
]

export const Learn = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }

    const packName = useAppSelector(getPackName)
    const cards = useAppSelector(getCards)
    const cardsStatus = useAppSelector(getCardsStatus)

    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardType>({} as CardType)
    const [showAnswer, setShowAnswer] = useState(false)
    const [grade, setGrade] = useState(0)

    const onShowAnswerClick = () => {
        setShowAnswer(true)
    }

    const onGradesChange = (e: ChangeEvent<HTMLInputElement>, value: number) => {
        if (e.currentTarget.checked) {
            setGrade(value)
        } else {
            setGrade(0)
        }
    }

    const onNextClick = () => {
        setShowAnswer(false)
        dispatch(updateCardGrade({card_id: card._id, grade: grade}))
        setGrade(0)
    }

    useEffect(() => {
        if (first) {
            dispatch(fetchCards({packId}))
            setFirst(false)
        }
        if (cards.length > 0) {
            setCard(getRandomCard(cards))
        }
    }, [packId, cards, first])

    return (
        <Container className={s.mainContainer}>
            <Paper className={s.paper}>
                <h1 className={s.title}>{packName}</h1>
                <p className={s.infoText}>
                    Number of attempts to answer the question: <span className={s.infoNumber}>{card.shots}</span>
                </p>
                <h2 className={s.textContainer}>
                    Question:
                    {
                        card.question !== 'no question' && <span className={s.text}> {card.question}?</span>
                    }
                </h2>
                {
                    card.questionImg && <img src={card.questionImg}
                                             alt={'pack name'}
                                             className={s.img}/>
                }
                {
                    !showAnswer && <Button onClick={onShowAnswerClick}
                                           disabled={cardsStatus === 'loading'}
                                           variant={'contained'}
                                           sx={{m: 2}}
                    >Show answer</Button>
                }
                {
                    showAnswer && (
                        <>
                            <h2 className={s.textContainer}>
                                Answer: <span className={s.text}>{card.answer}</span>
                            </h2>

                            {
                                grades.map((g, i) => (
                                    <RadioGroup key={i} value={grade} onChange={(e) => onGradesChange(e, g.value)}>
                                        <FormControlLabel control={<Radio/>} label={g.title} value={g.value}/>
                                    </RadioGroup>
                                ))
                            }
                            <Button onClick={onNextClick}
                                    disabled={grade === 0}
                                    sx={{mt: 2}}
                                    variant={'contained'}
                            >Next</Button>
                        </>
                    )
                }
            </Paper>
        </Container>
    );
};
