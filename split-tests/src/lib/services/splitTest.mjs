import { create, getSplitTest } from "./splitTestStore.mjs";

const MAX_PCT = 99;

export const getTargetFromSplit = async (id) => {
  const st = await getSplitTest(id);
  rand = randNum();
  const targetMap = st.targets
    .map((item) => {
      return { pct: parseInt(item.pct), target: item.target };
    })
    .sort((a, b) => {
      return a < b ? -1 : 1;
    });
  sum = 0;
  const target = targetMap.find((t) => {
    sum += t.pct;
    return sum >= rand;
  });
  return target.target;
};

export const createSplitTest = async (params) => {
  // probably do some validation...
  const st = await create(params);
  return st;
};

export const randNum = () => {
  return Math.floor(Math.random() * MAX_PCT) + 1;
};
