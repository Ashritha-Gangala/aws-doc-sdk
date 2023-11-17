import { describe, it } from "vitest";

import { scenarios } from "../index.js";

describe("workflow", () => {
  it("should run without error", async () => {
    await scenarios.deploy.run({ confirmAll: true, verbose: true });
    await scenarios.demo.run({ confirmAll: true, verbose: true });
    await scenarios.destroy.run({ confirmAll: true, verbose: true });
  });
});
