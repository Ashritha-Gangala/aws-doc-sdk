import { describe, expect, test } from "vitest";
import { execSync } from "child_process";
import path from "path";

describe("Converse with text generation models", () => {
  const file = "converse.js";

  const subdirectories = [
    "ai21LabsJurassic2",
    "amazonTitanText",
    "anthropicClaude",
    "cohereCommand",
    "metaLlama",
    "mistral",
  ];

  const baseDirectory = path.join(__dirname, "..", "models");

  test.each(subdirectories)(
    "should invoke the model and return text",
    (subdirectory) => {
      const script = path.join(baseDirectory, subdirectory, file);
      const output = execSync(`node ${script}`, {
        encoding: "utf-8",
      });
      expect(output).toMatch(/\S/);
    },
  );
});
