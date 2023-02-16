/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

const send = vi.fn();

vi.doMock("@aws-sdk/client-s3", async () => {
  const actual = await vi.importActual("@aws-sdk/client-s3");
  return {
    ...actual,
    S3Client: class {
      send = send;
    },
  };
});

import { main } from "../actions/copy-object.js";

describe("copy-object", () => {
  it("should log the response from the service", async () => {
    send.mockResolvedValue("foo");

    const spy = vi.spyOn(console, "log");

    await main();

    expect(spy).toHaveBeenCalledWith("foo");
  });
});
