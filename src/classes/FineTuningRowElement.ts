import IFineTuningRowElement from "../models/FineTuningRowElement";

export default class FineTuningRowElement implements IFineTuningRowElement {
  readonly role: "system" | "assistant" | "user";
  readonly content: string;
  weight?: 0 | 1;

  constructor(role: "system" | "assistant" | "user", content: string, weight?: 0 | 1) {
    this.role = role;
    this.content = content;
    this.weight = weight;
  }

  setWeight(weight: 0 | 1): void {
    this.weight = weight;
  }
}
