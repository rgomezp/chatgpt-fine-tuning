import { ChatMessage } from "chatgpt";
import { FileManager } from "../helpers/FileManager";
import ITuner from "../models/Tuner";
import FineTuningRow from "./FineTuningRow";

export default class Tuner implements ITuner {
  constructor(readonly response: ChatMessage, private row: FineTuningRow, private outfile: string) {
    this.row = row;
  }

  async approve(): Promise<void> {
    console.log("Approved");
    this.row.approve();
    await FileManager.writeLine(this.outfile, JSON.stringify(this.row));
  }

  async reject(): Promise<void> {
    console.log("Rejected");
    this.row.reject();
  }

  async fix(userText: string, assistantText: string, log?: boolean): Promise<void> {
    console.log("Fixing");
    this.row.fix(userText, assistantText);
    await FileManager.writeLine(this.outfile, JSON.stringify(this.row));

    if (log) {
      await this.log(`Fixed after user message: ${userText}`);
    }
  }

  async log(message: string): Promise<void> {
    await FileManager.writeLine(this.outfile, `>>>>>>>>>>>>>>> ${message} <<<<<<<<<<<<<<<<`);
  }
}
