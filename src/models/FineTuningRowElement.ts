export default interface IFineTuningRowElement {
  role: "system" | "assistant" | "user";
  content: string;
  weight?: 0 | 1;
  setWeight(weight: 0 | 1): void;
}
