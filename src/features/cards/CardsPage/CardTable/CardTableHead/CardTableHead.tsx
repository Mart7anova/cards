import React, {useState} from 'react';
import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {setCardsSearchParams} from "../../../slice";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {getPackUserId} from "../../../selectors";
import {getUserProfile} from "../../../../profile/selectors";

const headers = [
    {name: 'Question', sortName: 'question'},
    {name: 'Answer', sortName: 'answer'},
    {name: 'Last update', sortName: 'updated'},
    {name: 'Shots', sortName: 'shots'},
    {name: 'Grade', sortName: 'grade'},
]

export const CardTableHead = () => {
    const dispatch = useAppDispatch()
    const [isSortHeader, setIsSortHeader] = useState(true)

    const packUserId = useAppSelector(getPackUserId)
    const {_id} = useAppSelector(getUserProfile)

    const isOwner = packUserId === _id

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
                {
                    isOwner && <TableCell>Actions</TableCell>
                }
            </TableRow>
        </TableHead>
    );
};
