import React, { ReactElement } from 'react';

import { NoResult } from 'common/components/NoResult/NoResult';
import { SkeletonTable } from 'common/components/SkeletonTable/SkeletonTable';

type PropsType = {
  isLoading: boolean;
};

export const EmptyTable = ({ isLoading }: PropsType): ReactElement => {
  return isLoading ? <SkeletonTable /> : <NoResult />;
};
