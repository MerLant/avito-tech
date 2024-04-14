export type Range = [number, number];

export interface FilterParams {
  yearRange: Range;
  ageRange: Range;
  ratingRange: Range;
  country?: string;
}

export interface FilterApplication {
  onApplyFilters: (filters: FilterParams) => void;
}
