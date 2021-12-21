interface TopLocationParam {
  unit?: string;
  end_time?: number;
  start_time?: number;
}

export interface TopLocationPayload {
  unit?: string;
  end_time?: number;
  start_time?: number;
  location?: string | number;
}

export default TopLocationParam;
