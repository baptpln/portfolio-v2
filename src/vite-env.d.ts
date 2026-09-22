/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Serverless proxy URL for the chat demo, e.g. `/api/chat`. */
  readonly VITE_CHAT_ENDPOINT?: string;
  /** Direct Gemini key. Public once bundled — prefer VITE_CHAT_ENDPOINT. */
  readonly VITE_GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
