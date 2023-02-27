const MAX_PCT = 99;
let store = undefined;

const split = async (id) => {
  const rand = Math.floor(Math.random() * MAX_PCT) + 1;
  const t = await getTargetFromSplit(id, rand);
  return t;
};

const getTargetFromSplit = async (id, rand) => {
  const st = await store.getSplitTest(id);
  let sum = 0;
  const targetMap = st.targets
    .map((item) => {
      return { pct: parseInt(item.pct), target: item.target };
    })
    .sort((a, b) => {
      return a < b ? -1 : 1;
    });
  const target = targetMap.find((t) => {
    sum += t.pct;
    return sum >= rand;
  });
  return target.target;
};

const create = async (params) => {
  // probably do some validation...
  const st = await store.create(params);
  return st;
};

export const getSplitTestService = (_store) => {
  store = _store;
  return {
    split,
    getTargetFromSplit,
    create,
  };
};
