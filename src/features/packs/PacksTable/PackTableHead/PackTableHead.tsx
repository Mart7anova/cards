import React, {useState} from 'react';
import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {setCardsSearchParams} from "../../../cards/slice";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";

const headers = [
    {name: 'Name', sortName: 'name'},
    {name: 'Cards', sortName: 'cardsCount'},
    {name: 'Last update', sortName: 'updated'},
    {name: 'Create by', sortName: 'user_name'}
]

export const PackTableHead = () => {
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

    return (
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
    );
};
