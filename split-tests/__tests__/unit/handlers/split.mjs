import { getSplitTestService } from "../../../src/lib/services/splitTest.mjs";

const store = {
  getSplitTest(_id) {
    return {
      name: "Test1",
      targets: [
        { pct: 70, target: "http://fu.com/1" },
        { pct: 30, target: "http://fu.com/2" },
      ],
    };
  },
};

describe("Test the Split Tester", function () {
  it("should select the first target", async () => {
    const id = "abc-123";
    const service = getSplitTestService(store);

    const target = await service.getTargetFromSplit(id, 1);
    const expectedResult = "http://fu.com/1";
    expect(target).toEqual(expectedResult);
  });

  it("should select the second target", async () => {
    const id = "abc-123";
    const service = getSplitTestService(store);

    const target = await service.getTargetFromSplit(id, 75);
    const expectedResult = "http://fu.com/2";
    expect(target).toEqual(expectedResult);
  });
});
