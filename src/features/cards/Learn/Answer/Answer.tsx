import React, {ChangeEvent, useState} from 'react';
import style from "../Learn.module.scss";
import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {CardType} from "../../api";
import {updateCardGrade} from "../../slice";

const grades = [
    {title: 'Did not know', value: 1,},
    {title: 'Forgot', value: 2,},
    {title: 'A lot of thought', value: 3,},
    {title: 'Confused', value: 4,},
    {title: 'Knew the answer', value: 5,},
]

type PropsType = {
    card: CardType
    hideAnswer: () => void
}

export const Answer = ({card, hideAnswer}: PropsType) => {
    const dispatch = useAppDispatch()
    const [grade, setGrade] = useState(0)

    const gradesChangeHandler = (e: ChangeEvent<HTMLInputElement>, value: number) => {
        if (e.currentTarget.checked) {
            setGrade(value)
        } else {
            setGrade(0)
        }
    }

    const nextClickHandler = () => {
        hideAnswer()
        dispatch(updateCardGrade({card_id: card._id, grade: grade}))
        setGrade(0)
    }

    return (
        <>
            <h2 className={style.textContainer}>
                Answer: <span className={style.text}>{card.answer}</span>
            </h2>

            {
                grades.map((g, i) => (
                    <RadioGroup key={i} value={grade} onChange={(e) => gradesChangeHandler(e, g.value)}>
                        <FormControlLabel control={<Radio/>} label={g.title} value={g.value}/>
                    </RadioGroup>
                ))
            }

            <Button onClick={nextClickHandler}
                    disabled={grade === 0}
                    sx={{mt: 2}}
                    variant={'contained'}
            >Next</Button>
        </>
    );
};
