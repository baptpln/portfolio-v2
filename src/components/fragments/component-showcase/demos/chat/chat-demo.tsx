import type { FC } from "react";
import { InputSection } from "./input-section";
import { MessagesList } from "./messages-list";
import { PromptSuggestions } from "./prompt-suggestions";
import { useChat } from "./use-chat";
import { useStickToBottom } from "./use-stick-to-bottom";

export const ChatDemo: FC = () => {
  const { messages, typing, suggestions, send, isEmpty } = useChat();
  const { scroller, content, stickNow } = useStickToBottom<
    HTMLDivElement,
    HTMLDivElement
  >();

  const handleSend = (text: string) => {
    stickNow();
    void send(text);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <MessagesList
        messages={messages}
        typing={typing}
        scrollerRef={scroller}
        contentRef={content}
      />

      {isEmpty && (
        <PromptSuggestions
          suggestions={suggestions}
          onPick={handleSend}
          disabled={typing}
        />
      )}

      <InputSection onSend={handleSend} disabled={typing} />
    </div>
  );
};
