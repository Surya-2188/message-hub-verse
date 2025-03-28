
import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  timestamp: string;
  sender: "me" | "other" | string;
}

export function Message({ content, timestamp, sender }: MessageProps) {
  const isMe = sender === "me";
  
  return (
    <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
      <div className="flex flex-col max-w-[75%]">
        {sender !== "me" && sender !== "other" && (
          <span className="text-xs text-muted-foreground ml-2 mb-1">{sender}</span>
        )}
        <div className={cn(
          isMe ? "message-sent" : "message-received"
        )}>
          {content}
        </div>
        <div className={cn(
          "text-xs text-muted-foreground mt-1",
          isMe ? "text-right mr-2" : "ml-2"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
}
