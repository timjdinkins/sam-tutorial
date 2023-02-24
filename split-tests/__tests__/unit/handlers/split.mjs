import {
  getTargetFromSplit,
  randNum,
} from "../../../src/lib/services/splitTest.mjs";
import { getSplitTest } from "../../../src/lib/services/splitTestStore.mjs";

describe("Test the Split", function () {
  // This test invokes putItemHandler() and compare the result
  it("should do a split test", async () => {
    const id = "abc-123";
    const ts = [
      { pct: 70, target: "http://test.com/fu" },
      { pct: 30, target: "http://test.com/fum" },
    ];
    const splitTest = { id, name: "test", targets: ts };

    // need to mock getSpitTest
    // need to mock randNum

    const result = await getTargetFromSplit(id);

    const expectedResult = ts[0];
    expect(result).toEqual(expectedResult);
  });
});
