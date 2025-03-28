
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup?: boolean;
}

interface ChatPreviewProps {
  chat: Chat;
  onClick: () => void;
  active: boolean;
}

export function ChatPreview({ chat, onClick, active }: ChatPreviewProps) {
  return (
    <div
      className={cn(
        "flex items-center p-3 cursor-pointer transition-colors",
        active ? "bg-accent/10" : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={chat.avatar} alt={chat.name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {chat.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{chat.name}</div>
          <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {chat.time}
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-muted-foreground truncate">
            {chat.lastMessage}
          </div>
          {chat.unread > 0 && (
            <Badge variant="default" className="rounded-full h-5 min-w-5 px-1.5 ml-2">
              {chat.unread}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
