/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prompter } from "../prompter.js";
import { Logger } from "../logger.js";
import { SlowLogger } from "../slow-logger.js";

export class Step {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * @param {Record<string, any>} context,
   * @param {{ verbose: boolean }} [options]
   */
  handle(context, options) {
    if (options?.verbose) {
      console.log(
        `[DEBUG ${new Date().toISOString()}] Handling step: ${
          this.constructor.name
        }<${this.name}>`,
      );
      console.log(
        `[DEBUG ${new Date().toISOString()}] Context: ${JSON.stringify(
          context,
        )}`,
      );
    }
  }
}

export class ScenarioOutput extends Step {
  /**
   * @param {string} name
   * @param {string | (context: Record<string, any>) => string | false} value
   * @param {{ slow: boolean, header: boolean, preformatted: boolean }} [options]
   */
  constructor(name, value, options = { slow: true }) {
    super(name);
    this.value = value;
    this.options = options;
    this.slowLogger = new SlowLogger(20);
    this.logger = new Logger();
  }

  /**
   * @param {Record<string, any>} context
   * @param {{ verbose: boolean, confirmAll: boolean }} [options]
   */
  async handle(context, options) {
    super.handle(context, options);

    const output =
      typeof this.value === "function" ? this.value(context) : this.value;
    if (!output) {
      return;
    }
    const paddingTop = "\n";
    const paddingBottom = "\n";
    const logger =
      this.options?.slow && !options?.confirmAll
        ? this.slowLogger
        : this.logger;
    const message = paddingTop + output + paddingBottom;

    if (this.options?.header) {
      await this.logger.log(this.logger.box(message));
    } else {
      await logger.log(message, this.options.preformatted);
    }
  }
}

export class ScenarioInput extends Step {
  /**
   * @param {string} name
   * @param {string | (c: Record<string, any>) => string | false } prompt
   * @param {{ type: "confirm" | "input" | "multi-select" | "select", choices: (string | { name: string, value: string })[] }} [options]
   */
  constructor(name, prompt, options) {
    super(name);
    this.prompt = prompt;
    this.options = options;
    this.prompter = new Prompter();
  }

  /**
   * @param {Record<string, any>} context
   * @param {{ confirmAll: boolean, verbose: boolean }} [options]
   */
  async handle(context, options) {
    super.handle(context, options);
    const message =
      typeof this.prompt === "function" ? this.prompt(context) : this.prompt;
    if (!message) {
      return;
    }

    const choices =
      this.options?.choices && typeof this.options?.choices[0] === "string"
        ? this.options?.choices.map((s) => ({ name: s, value: s }))
        : this.options?.choices;

    if (this.options?.type === "multi-select") {
      context[this.name] = await this.prompter.checkbox({
        message,
        choices,
      });
    } else if (this.options?.type === "select") {
      context[this.name] = await this.prompter.select({
        message,
        choices,
      });
    } else if (this.options?.type === "input") {
      context[this.name] = await this.prompter.input({ message });
    } else if (this.options?.type === "confirm") {
      if (options?.confirmAll) {
        return;
      }

      context[this.name] = await this.prompter.confirm({
        message,
      });
    } else {
      throw new Error(
        `Error handling ScenarioInput, ${this.options?.type} is not supported.`,
      );
    }
  }
}

export class ScenarioAction extends Step {
  /**
   * @param {string} name
   * @param {(context: Record<string, any>) => Promise<void>} action
   */
  constructor(name, action) {
    super(name);
    this.action = action;
  }

  /**
   * @param {Record<string, any>} context
   * @param {{ verbose: boolean }} options
   */
  async handle(context, options) {
    super.handle(context, options);
    await this.action(context);
  }
}

export class Scenario {
  /**
   * @type {Record<string, any>}
   */
  context = {};

  /**
   * @param {string} name
   * @param {(ScenarioOutput | ScenarioInput | ScenarioAction)[]} steps
   * @param {Record<string, any>} initialContext
   */
  constructor(name, steps = [], initialContext = {}) {
    this.name = name;
    this.steps = steps;
    this.context = { ...initialContext, name };
  }

  /**
   * @param {{ confirmAll: boolean, verbose: boolean }} runConfig
   */
  async run(runConfig) {
    for (const step of this.steps) {
      await step.handle(this.context, runConfig);
    }
  }
}
