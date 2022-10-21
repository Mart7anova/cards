import React, {useState} from 'react';
import {
    Checkbox,
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {cardActions} from '../../index';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {CardType} from '../../../../api/cardsApi';
import dayjs from 'dayjs';
import {CardIconsGroup} from './CardIconsGroup/CardIconsGroup';
import {NoResult} from '../../../../common/components/NoResult/NoResult';
import {addAlternateSrc} from '../../../../common/utils/addAlternateSrc';

const {setCardsSearchParams} = cardActions

const headers = [
    {name: 'Question', sortName: 'question'},
    {name: 'Answer', sortName: 'answer'},
    {name: 'Last update', sortName: 'updated'},
    {name: 'Shots', sortName: 'shots'},
    {name: 'Grade', sortName: 'grade'},
]

type PropsType = {
    cards: CardType[]
    isOwner: boolean
    rowsPerPage: number
    page: number
    count: number
    setIsSearching: (isSearching: boolean) => void
}

export const CardsTable = ({cards, isOwner, rowsPerPage, page, count, setIsSearching}: PropsType) => {
    const dispatch = useAppDispatch()

    const [isSortHeader, setIsSortHeader] = useState(true)

    const onChangeSortPacks = (sortHeader: boolean, sortName: string) => {
        let sortValue

        if (sortHeader) {
            sortValue = '1' + sortName
        } else {
            sortValue = '0' + sortName
        }
        dispatch(setCardsSearchParams({sortCards: sortValue}))
    }

    const handleChangePage = (event: unknown, page: number) => {
        dispatch(setCardsSearchParams({page: page + 1}))
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCardsSearchParams({pageCount: Number(e.target.value)}))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            headers.map(header => (
                                <TableCell key={header.name}>
                                    {header.name}
                                    <Checkbox icon={<ExpandMoreIcon/>}
                                              checkedIcon={<ExpandLessIcon/>}
                                              color={'default'}
                                              onClick={() => setIsSortHeader(!isSortHeader)}
                                              onChange={() => onChangeSortPacks(isSortHeader, header.sortName)}
                                    />
                                </TableCell>
                            ))
                        }
                        {
                            isOwner && <TableCell>Actions</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        cards.map(card => (
                            <TableRow key={card._id}>
                                <TableCell sx={{overflowWrap: 'anywhere', width: '30%'}}>
                                    <div style={{display: 'flex',  alignItems: 'center', flexWrap: 'wrap'}}>
                                        {
                                            card.questionImg && <img src={card.questionImg}
                                                                     onError={addAlternateSrc}
                                                                     alt={'pack name'}
                                                                     style={{height: '50px', marginRight: '10px'}}/>
                                        }
                                        {
                                            card.question !== 'no question' && <p>{card.question}</p>
                                        }
                                    </div>
                                </TableCell>
                                <TableCell sx={{overflowWrap: 'anywhere', width: '20%'}}>
                                    {card.answer}
                                </TableCell>
                                <TableCell sx={{width: '20%'}}>
                                    {dayjs(card.updated).format(`DD.MM.YYYY`)}
                                </TableCell>
                                <TableCell sx={{width: '10%'}}>
                                    {card.shots}
                                </TableCell>
                                <TableCell sx={{width: '10%'}}>
                                    <Rating value={card.grade} readOnly/>
                                </TableCell>
                                {
                                    isOwner && <TableCell sx={{width: '10%'}}>
                                        <CardIconsGroup packId={card.cardsPack_id}
                                                        cardId={card._id}
                                                        cardName={card.question}
                                                        question={card.question}
                                                        questionImg={card.questionImg}
                                                        answer={card.answer}
                                                        setIsSearching={setIsSearching}
                                        />
                                    </TableCell>
                                }
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                component="div"
                count={count}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {cards.length === 0 && <NoResult/>}
        </TableContainer>
    );
};
