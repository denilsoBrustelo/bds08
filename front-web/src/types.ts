export type PieSeriesData = {
  labels: string[];
  series: number[];
};

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type FilterData = {
  store?: Store | null;
};

export type Store = {
  id: number;
  name: string;
};

export type SalesByGender = {
  gender: Gender;
  sum: number;
};
