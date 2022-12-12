import { convertFileToBase64 } from './convertFileToBase64';

import { AppDispatchType } from 'app/store';
import { setAppError } from 'features/app/slice';

const MAX_FILE_SIZE = 4000000;

export const uploadFile = (args: {
  files: FileList | null;
  dispatch: AppDispatchType;
  actionForDispatch?: any;
  setFile?: (file: string) => void;
}): void => {
  const { files, dispatch, actionForDispatch, setFile } = args;

  if (files && files.length) {
    const file = files[0];

    if (file.size < MAX_FILE_SIZE) {
      convertFileToBase64(file, (file64: string) => {
        if (actionForDispatch) {
          dispatch(actionForDispatch({ avatar: file64 }));
        } else if (setFile) {
          setFile(file64);
        }
      });
    } else {
      dispatch(setAppError('The file is too large'));
    }
  }
};
