import { ChatMessage } from "chatgpt";

export default interface ITuner {
  response: ChatMessage;
  approve(): Promise<void>;
  reject(): Promise<void>;
  fix(userText: string, assistantText: string, log?: boolean): Promise<void>;
  log(message: string): void;
}
