import { AxiosResponse } from 'axios';

import { instance } from 'api/instance';
import { PackSearchParamsType, ResponseCardPacksType } from 'features/packs/Types';

export const packApi = {
  getPacks(params: PackSearchParamsType) {
    return instance.get<PackSearchParamsType, AxiosResponse<ResponseCardPacksType>>(
      `/cards/pack`,
      { params },
    );
  },
  createPack(name: string, isPrivate: boolean, deckCover: string) {
    return instance.post(`cards/pack`, {
      cardsPack: {
        name,
        private: isPrivate,
        deckCover,
      },
    });
  },
  deletePack(packId: string) {
    return instance.delete(`/cards/pack/?id=${packId}`);
  },
  updatePack(_id: string, name: string, isPrivate: boolean, deckCover: string) {
    return instance.put(`/cards/pack`, {
      cardsPack: {
        _id,
        name,
        private: isPrivate,
        deckCover,
      },
    });
  },
};
