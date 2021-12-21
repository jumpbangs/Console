export interface PaginationOptions {
  limit: number;
  counter: number;
  ending_before?: string;
  starting_after?: string;
}

export interface DevicePaginationOptions {
  limit: number;
  counter: number;
  status?: string;
  device_type?: string;
  ending_before?: string;
  starting_after?: string;
}
