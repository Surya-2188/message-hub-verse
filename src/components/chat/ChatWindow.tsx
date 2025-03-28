
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile, MoreVertical, Phone, Video, Image } from "lucide-react";
import { Message } from "./Message";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const chatData = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    online: true,
    messages: [
      {
        id: "1",
        content: "Hey there! How's your day going?",
        timestamp: "10:24 AM",
        sender: "other",
      },
      {
        id: "2",
        content: "Pretty good, thanks! Just finishing up some work.",
        timestamp: "10:26 AM",
        sender: "me",
      },
      {
        id: "3",
        content: "Hey, are we still meeting today?",
        timestamp: "10:30 AM",
        sender: "other",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Tech Team",
    avatar: "/placeholder.svg",
    online: false,
    isGroup: true,
    members: ["You", "Mike", "Jennifer", "Alex"],
    messages: [
      {
        id: "1",
        content: "Hi team, can anyone help me with the API issue?",
        timestamp: "Yesterday",
        sender: "Jennifer",
      },
      {
        id: "2",
        content: "What's the problem exactly?",
        timestamp: "Yesterday",
        sender: "me",
      },
      {
        id: "3",
        content: "I'll push the changes tonight",
        timestamp: "Yesterday",
        sender: "Mike",
      },
    ],
  },
};

export function ChatWindow() {
  const { chatId } = useParams<{ chatId: string }>();
  const [chat, setChat] = useState<any>(null);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatId && chatData[chatId as keyof typeof chatData]) {
      setChat(chatData[chatId as keyof typeof chatData]);
    }
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !chat) return;
    
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: "Just now",
      sender: "me",
    };
    
    setChat((prev: any) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    
    setMessage("");
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-medium">Select a conversation</h3>
          <p className="text-muted-foreground text-sm">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {chat.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{chat.name}</h2>
            <div className="text-xs text-muted-foreground">
              {chat.isGroup 
                ? `${chat.members.length} members` 
                : chat.online ? "Online" : "Offline"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {chat.messages.map((msg: any) => (
            <Message
              key={msg.id}
              content={msg.content}
              timestamp={msg.timestamp}
              sender={msg.sender === "me" ? "me" : chat.isGroup ? msg.sender : "other"}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Image className="h-5 w-5" />
          </Button>
          <Input
            className="flex-1"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button 
            className="rounded-full" 
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
