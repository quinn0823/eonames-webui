export interface Character {
  char: string;
  bihua: number;
  wuxing: string;
  is_xiyong: boolean;
}

export interface NamePart {
  strokes: number;
  characters: Character[];
}

export interface ShuliDetail {
  luck: string;
  is_female_forbidden: boolean;
  powers: string[];
}

export interface Grid {
  stroke_sum: number;
  wuxing: string;
  yinyang: string;
  is_xiyong: boolean;
  is_xiyong_yinyang: boolean;
  shuli: ShuliDetail;
}

export interface SancaiDetail {
  from: string;
  to: string;
  type: string;
  description: string;
}

export interface Sancai {
  tiange: string;
  renge: string;
  dige: string;
  details: SancaiDetail[];
  are_tiange_renge_same_yinyang: boolean;
  are_renge_dige_same_yinyang: boolean;
}

export interface MingziResponse {
  name_parts: Record<string, NamePart>;
  grids: Record<string, Grid>;
  sancai: Sancai;
  xiyong_grid_count: number;
  xiyong_yinyang_grid_count: number;
  same_yinyang_cancai_count: number;
}

export interface MingziParams {
  fuxing: string;
  muxing: string;
  zi: string;
  ming: string;
  hao?: string;
  xiyong_wuxing?: string[];
  xiyong_yinyang?: string;
}
