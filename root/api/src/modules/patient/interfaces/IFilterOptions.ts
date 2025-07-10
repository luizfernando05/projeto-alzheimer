export interface IFilterOptions {
  page?: number;
  limit?: number;
  gender?: string;
  prediction?: string;
  minAge?: number;
  maxAge?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}
