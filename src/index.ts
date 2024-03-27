import { ChatGPTAPI, ChatGPTAPIOptions, ChatMessage, SendMessageOptions } from "chatgpt";
import Tuner from "./classes/Tuner";
import FineTuningRowElement from "./classes/FineTuningRowElement";
import FineTuningRow from "./classes/FineTuningRow";

export { Tuner, ChatGPTAPIOptions, SendMessageOptions, ChatMessage };

class ChatGptFineTuning {
  private instance: ChatGPTAPI;

  /**
   * @param config - ChatGPT API configuration
   * @param outfile - Output file path (JSONL)
   */
  constructor(readonly config: ChatGPTAPIOptions, readonly outfile: string) {
    this.instance = new ChatGPTAPI(config);
  }

  async sendMessage(text: string, opts?: SendMessageOptions): Promise<Tuner> {
    if (!this.config.systemMessage) {
      throw new Error("System message is required for fine-tuning. Please provide a system message in the configuration.");
    }

    const response = await this.instance.sendMessage(text, opts);
    const system = new FineTuningRowElement("system", this.config.systemMessage);
    const user = new FineTuningRowElement("user", text);
    const assistant = new FineTuningRowElement("assistant", response.text);

    const row = new FineTuningRow([system, user, assistant]);
    return new Tuner(response, row, this.outfile);
  }
}

export default ChatGptFineTuning;
