export type RangeParamType = { min: number; max: number };

export type DoubleRangeFilterType = {
  title: string;
  setSearchParam: ({ min, max }: RangeParamType) => void;
  currentMinCount: number;
  currentMaxCount: number;
  minCountParam: number | undefined;
  maxCountParam: number | undefined;
  disabled: boolean;
  className?: string | undefined;
};
