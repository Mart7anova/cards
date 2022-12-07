import React from 'react';
import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {setPacksSearchParams} from "../../slice";
import {useToggle} from "../../../../common/hooks/useToggle";

const headers = [
    {name: 'Name', sortName: 'name'},
    {name: 'Cards', sortName: 'cardsCount'},
    {name: 'Last update', sortName: 'updated'},
    {name: 'Create by', sortName: 'user_name'}
]

export const PackTableHead = () => {
    const dispatch = useAppDispatch()

    const [isHeaderSorted, toggleHeaderSort] = useToggle(true)

    const packsSortChangeHandler = (isHeaderSorted: boolean, sortName: string) => {
        return () => {
            let sortValue

            if (isHeaderSorted) {
                sortValue = '1' + sortName
            } else {
                sortValue = '0' + sortName
            }
            dispatch(setPacksSearchParams({sortPacks: sortValue}))
        }
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
                                      onClick={toggleHeaderSort}
                                      onChange={packsSortChangeHandler(isHeaderSorted, header.sortName)}
                            />
                        </TableCell>
                    ))
                }
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};
