import { AxiosResponse } from 'axios';

import { instance } from 'api';
import { PackSearchParamsType, ResponseCardPacksType } from 'api/packs/types';
import { PathApi } from 'enums';

export const packApi = {
  getPacks(params: PackSearchParamsType) {
    return instance.get<PackSearchParamsType, AxiosResponse<ResponseCardPacksType>>(
      PathApi.PACK,
      { params },
    );
  },
  createPack(name: string, isPrivate: boolean, deckCover: string) {
    return instance.post(PathApi.PACK, {
      cardsPack: {
        name,
        private: isPrivate,
        deckCover,
      },
    });
  },
  deletePack(packId: string) {
    return instance.delete(`${PathApi.PACK}?id=${packId}`);
  },
  updatePack(_id: string, name: string, isPrivate: boolean, deckCover: string) {
    return instance.put(PathApi.PACK, {
      cardsPack: {
        _id,
        name,
        private: isPrivate,
        deckCover,
      },
    });
  },
};
