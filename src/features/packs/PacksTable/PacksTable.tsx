import {Paper, Table, TableContainer, TablePagination} from '@mui/material';
import React from 'react';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {setPacksSearchParams} from "../slice";
import {PackTableHead} from "./PackTableHead/PackTableHead";
import {PackTableBody} from "./PackTableBody/PackTableBody";


type PropsType = {
    rowsPerPage: number
    page: number
    count: number
}

export const PacksTable = ({page, rowsPerPage, count}: PropsType) => {
    const dispatch = useAppDispatch()

    const handleChangePage = (event: unknown, page: number) => {
        dispatch(setPacksSearchParams({page: page + 1}))
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPacksSearchParams({pageCount: Number(e.target.value)}))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <PackTableHead/>
                <PackTableBody/>
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
