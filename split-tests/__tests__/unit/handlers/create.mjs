import { getSplitTestService } from "../../../src/lib/services/splitTest.mjs";

const store = {
  create(_params) {
    return { id: 1 };
  },
};

describe("Test Split Test creation", function () {
  it("should call create on the split test store", async () => {
    const id = "abc-123";
    const service = getSplitTestService(store);

    const splitTest = await service.create({});
    expect(splitTest.id).toEqual(1);
  });
});
