// Type is filter options for filters
export interface FilterOptions {
  label: string;
  value: string;
  disable?: boolean;
  fixed?: boolean;
  [key: string]: string | boolean | undefined;
}