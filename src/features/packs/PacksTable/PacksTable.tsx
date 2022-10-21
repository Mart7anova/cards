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
import React, {useState} from 'react';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import dayjs from 'dayjs';
import {PackType} from '../../../api/packApi';
import {PackIconsGroup} from './packIconsGroup/packIconsGroup';
import {PATH} from '../../../common/enums/path';
import {Link} from 'react-router-dom';
import {cardActions} from '../../cards';
import {packActions} from '../index';
import {addAlternateSrc} from '../../../common/utils/addAlternateSrc';

const {setCardsSearchParams} = cardActions
const {setPacksSearchParams} = packActions

type PropsType = {
    rowsPerPage: number
    page: number
    count: number
    packs: PackType[]
}

const headers = [
    {name: 'Name', sortName: 'name'},
    {name: 'Cards', sortName: 'cardsCount'},
    {name: 'Last update', sortName: 'updated'},
    {name: 'Create by', sortName: 'user_name'}
]

export const PacksTable = ({page, rowsPerPage, packs, count}: PropsType) => {
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
        dispatch(setPacksSearchParams({page: page + 1}))
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPacksSearchParams({pageCount: Number(e.target.value)}))
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
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        packs.map(pack => (
                            <TableRow key={pack._id}>
                                <TableCell sx={{overflowWrap: 'anywhere', width: '25%'}}>
                                    <Link to={PATH.PACK + pack._id} style={{textDecoration: 'none', display: 'flex',  alignItems: 'center', flexWrap: 'wrap'}}>
                                        {
                                            pack.deckCover && <img src={pack.deckCover}
                                                                   onError={addAlternateSrc}
                                                                   alt={' '}
                                                                   style={{height: '50px', paddingRight: '15px'}}/>
                                        }
                                        <p style={{color:'#196cbe'}}>
                                            {pack.name}
                                        </p>
                                    </Link>
                                </TableCell>
                                <TableCell sx={{width: '14%'}}>{pack.cardsCount}</TableCell>
                                <TableCell sx={{width: '20%'}}>{dayjs(pack.updated).format(`DD.MM.YYYY`)}</TableCell>
                                <TableCell sx={{overflowWrap: 'anywhere', width: '25%'}}>{pack.user_name}</TableCell>
                                <TableCell sx={{width: '16%'}}>
                                    <PackIconsGroup packUserId={pack.user_id}
                                                    packId={pack._id}
                                                    packName={pack.name}
                                                    cardsCount={pack.cardsCount}
                                                    deckCover={pack.deckCover}
                                    />
                                </TableCell>
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
        </TableContainer>

    );
};
