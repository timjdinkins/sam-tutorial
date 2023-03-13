export interface SplitTestService {
  split(id: string): Promise<SplitTestTarget | undefined>;
  getTargetFromSplit(id: string, rand: number): Promise<SplitTestTarget | undefined>;
  create(params: SplitTest): Promise<SplitTest>;
}

export interface SplitTestStore {
  create(st: SplitTest): Promise<SplitTest>;
  get(id: string): Promise<SplitTest | undefined>;
}

export type SplitTest = {
  id: string;
  name: string;
  targets: SplitTestTarget[];
  createdAt: string;
  updatedAt: string;
}

export type SplitTestTarget = {
  id: string;
  pct: number;
  target: string;
}
