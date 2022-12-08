import React from 'react';
import { SkeletonTable } from '../SkeletonTable/SkeletonTable';
import { NoResult } from '../NoResult/NoResult';

type PropsType = {
  isLoading: boolean
}

export const NoItems = ({ isLoading }: PropsType) => {
  return (
    <>
      {
        isLoading ? <SkeletonTable /> : <NoResult />
      }
    </>
  );
};
