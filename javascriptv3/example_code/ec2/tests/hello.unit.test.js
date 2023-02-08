import { describe, it, expect, vi } from "vitest";

const send = vi.fn();

vi.doMock("@aws-sdk/client-ec2", async () => {
  const actual = await vi.importActual("@aws-sdk/client-ec2");
  return {
    ...actual,
    EC2Client: class {
      send = send;
    },
  };
});

import { main } from "../hello.js";

describe("hello", () => {
  it("should log a list of security groups", async () => {
    const logSpy = vi.spyOn(console, "log");
    send.mockResolvedValueOnce({
      SecurityGroups: [
        {
          GroupName: "groupName",
          GroupId: "groupId",
        },
      ],
    });

    await main();
    
    expect(logSpy).nthCalledWith(
      1,
      "Hello, Amazon EC2! Let's list up to 10 of your security groups:"
    );
    expect(logSpy).nthCalledWith(2, " • groupId: groupName");
  });
});
