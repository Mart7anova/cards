import { SyntheticEvent } from 'react';

import brokenFile from 'assets/icon/broken-file.png';

export const addAlternateSrc = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
  // eslint-disable-next-line no-param-reassign
  event.currentTarget.src = brokenFile;
};
