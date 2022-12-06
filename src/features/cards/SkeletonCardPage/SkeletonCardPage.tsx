import React from 'react';
import {SkeletonTable} from "../../../common/components/SkeletonTable/SkeletonTable";
import {Container, Skeleton} from "@mui/material";

export const SkeletonCardPage = () => {
    return (
        <Container fixed>
            <Skeleton animation="pulse"
                      height={40}
                      width={100}
                      style={{margin: '30px 0 150px 0'}}/>
            <SkeletonTable/>
        </Container>
    );
};
