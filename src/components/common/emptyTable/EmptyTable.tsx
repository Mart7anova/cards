import React, { ReactElement } from 'react';

import { NoResult, SkeletonTable } from 'components/common';

type PropsType = {
  isLoading: boolean;
};

export const EmptyTable = ({ isLoading }: PropsType): ReactElement => {
  return isLoading ? <SkeletonTable /> : <NoResult />;
};
