import React, {useState} from 'react';
import {
    Checkbox,
    Paper,
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
import {cardActions} from '../index';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import { CardType } from '../../../api/cardsApi';
import dayjs from 'dayjs';

const {setSearchParams} = cardActions

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
}

export const CardsTable = ({cards,isOwner, rowsPerPage, page, count}:PropsType) => {
    const dispatch = useAppDispatch()

    const [isSortHeader, setIsSortHeader] = useState(true)

    const onChangeSortPacks = (sortHeader: boolean, sortName: string) => {
        let sortValue

        if (sortHeader) {
            sortValue = '1' + sortName
        } else {
            sortValue = '0' + sortName
        }
        dispatch(setSearchParams({sortCards: sortValue}))
    }

    const handleChangePage = (event: unknown, page: number) => {
        dispatch(setSearchParams({page: page + 1}))
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchParams({pageCount: Number(e.target.value)}))
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
                        cards.map(card=>(
                            <TableRow key={card._id}>
                                <TableCell sx={{overflowWrap: 'anywhere', width: '25%'}}>
                                    {card.question}
                                </TableCell>
                                <TableCell sx={{overflowWrap: 'anywhere', width: '25%'}}>
                                    {card.answer}
                                </TableCell>
                                <TableCell sx={{width: '18%'}}>
                                    {dayjs(card.updated).format(`DD.MM.YYYY`)}
                                </TableCell>
                                <TableCell sx={{ width: '10%'}}>
                                    {card.shots}
                                </TableCell>
                                <TableCell sx={{ width: '10%'}}>
                                    {card.grade}
                                </TableCell>
                                {
                                    isOwner && <TableCell sx={{ width: '16%'}}>
                                        jjj
                                    </TableCell>
                                }
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                component="div"
                count={count}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};
