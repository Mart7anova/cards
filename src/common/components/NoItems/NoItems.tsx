import React, { ReactElement } from 'react';

import { NoResult } from '../NoResult/NoResult';
import { SkeletonTable } from '../SkeletonTable/SkeletonTable';

type PropsType = {
  isLoading: boolean;
};

export const NoItems = ({ isLoading }: PropsType): ReactElement => {
  return isLoading ? <SkeletonTable /> : <NoResult />;
};
