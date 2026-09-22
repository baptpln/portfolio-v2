export interface Message {
  id: number;
  from: "visitor" | "bot";
  text: string;
}

/** Where the last reply came from. */
export type ReplySource = "live" | "scripted";
