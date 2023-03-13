import { SplitTest, SplitTestService, SplitTestStore, SplitTestTarget } from "../types";


const MAX_PCT = 99;
let store: SplitTestStore;

const split = async (id: string) => {
  const rand = Math.floor(Math.random() * MAX_PCT) + 1;
  const t = await getTargetFromSplit(id, rand);
  return t;
};

const getTargetFromSplit = async (id: string, rand: number): Promise<SplitTestTarget | undefined> => {
  const st: SplitTest | undefined = await store.get(id);
  if (!st) {
    return st
  }
  let sum = 0;
  const targets: SplitTestTarget[] = st.targets
    .sort((a, b) => {
      return a.pct < b.pct ? -1 : 1;
    });
  const target = targets.find((t) => {
    sum += t.pct;
    return sum >= rand;
  });
  return target;
};

const create = async (params: SplitTest): Promise<SplitTest> => {
  // probably do some validation...
  const st = await store.create(params);
  return st;
};

export const getSplitTestService = (_store: SplitTestStore): SplitTestService => {
  store = _store;
  return {
    split,
    getTargetFromSplit,
    create,
  };
};
