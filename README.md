<h1 align="center">Welcome to ChatGpt Fine Tuning SDK 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/chatgpt-fine-tuning" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/chatgpt-fine-tuning.svg">
  </a>
  <a href="https://github.com/rgomezp/chatgpt-fine-tuning/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/rgomezp/chatgpt-fine-tuning/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Easily tune your models.

* 🖤 [npm](https://www.npmjs.com/package/chatgpt-fine-tuning)

## Overview
This package helps you programmatically generate your fine-tuning dataset in JSONL format. It is a wrapper of the `chatgpt` npm package so you can use it the same way.

As documented in [OpenAI's official documentation](https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset), training data is expected to follow the format:

```json
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?"}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "How far is the Moon from Earth?"}, {"role": "assistant", "content": "Around 384,400 kilometers. Give or take a few, like that really matters."}]}
```

The way the package works is by using "tuners". Each `sendMessage` call returns a `tuner` object which you either approve or reject and fix.

Based on these actions, you will have a training file that reflects these decisions.

## Install

```sh
# npm
npm install chatgpt-fine-tuning

# yarn
yarn add chatgpt-fine-tuning
```

## Configuration
To use the SDK, you need to configure it with your API key. Here's a simple setup:

```ts
import ChatGptFineTuning from 'chatgpt-fine-tuning';

const outFile = 'fine-tuning-output.jsonl'; // required
const systemMessage = 'Marv is a factual chatbot that is also sarcastic.'; // required

const gpt4Api = new ChatGptFineTuning({
    apiKey: process.env.GPT4_API_KEY || '', // required
    systemMessage,
  }, outFile)
```

## Usage
### `tuner`
| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `approve` | - | `Promise<void>` | Approves the current row for fine-tuning.  |
| `reject` | - | `Promise<void>` | Rejects the current row for fine-tuning. |
| `fix` | `userText: string`, `assistantText: string`, `log?: boolean` | `Promise<void>` | Submits a correction for the current row, including the user and assistant text. Option to log details to file after each row. |
| `log` | `message: string` | `void` | Logs a message to the output file. This operation is synchronous. |

| Property | Type | Description |
|-----------------|-----------------|-------------|
| `response`      | `ChatMessage`   | Holds the current chat message that the tuner will operate on. |


```ts
const tuner = await gpt4Api.sendMessage("What is the capital of France?");

// programmatic verification
if (tuner.response.text.includes("Paris")) {
  tuner.approve();
} else {
  // marks assistant response with a weight of 0
  tuner.reject();
  // inserts the user response and a correct assistant response with a weight of 1
  tuner.fix("You did not provide the correct answer", "Paris");
}
tuner.log("Finished run")
```

### `ChatMessage`
| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the chat message. |
| `text` | `string` | The text content of the chat message. |
| `role` | `Role` | The role of the message sender (e.g., user, assistant). |
| `name` | `string` | The name of the sender. Optional. |
| `delta` | `string` | Optional string that may contain additional information or changes made to the message. |
| `detail` | `openai.CreateChatCompletionResponse` \| `CreateChatCompletionStreamResponse` | Optional detailed response from OpenAI or a streaming response, providing further context or metadata about the chat message. |
| `parentMessageId` | `string` | The ID of the parent message if this message is a reply or related to another message in the conversation. Optional. |
| `conversationId` | `string` | The ID of the conversation this message belongs to. Optional. |


## API
The API is the same as the `chatgpt` package ([reference](https://github.com/transitive-bullshit/chatgpt-api/blob/73fb30bc11b7b7d05409fe491562c2a4546cbd80/readme.md#usage---chatgptapi)).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/rgomezp/chatgpt-fine-tuning/issues).

## Show your support

Give a ⭐️ if this project helped you!

## Donate

Bitcoin: bc1qhp9havdzfzqr9mzdc3257txmegrpryhx3kdpyz

Strike: rodrigo

## 📝 License

This project is [MIT](https://github.com/rgomezp/chatgpt-fine-tuning/blob/main/LICENSE) licensed.