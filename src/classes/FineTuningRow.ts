import IFineTuningRow from "../models/FineTuningRow";
import IFineTuningRowElement from "../models/FineTuningRowElement";
import FineTuningRowElement from "./FineTuningRowElement";

export default class FineTuningRow implements IFineTuningRow {
  messages: IFineTuningRowElement[];

  constructor(messages: IFineTuningRowElement[]) {
    this.messages = messages;
  }

  approve(): void {
    this.messages.forEach((message) => {
      if (message.role === "assistant") {
        message.setWeight(1);
      }
    });
  }

  reject(): void {
    this.messages.forEach((message) => {
      if (message.role === "assistant") {
        message.setWeight(0);
      }
    });
  }

  fix(userText: string, assistantText: string): void {
    const user = new FineTuningRowElement("user", userText);
    const assistant = new FineTuningRowElement("assistant", assistantText, 1);

    this.messages.push(user);
    this.messages.push(assistant);
  }
}
