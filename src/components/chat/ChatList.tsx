
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatPreview } from "./ChatPreview";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const recentChats = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Hey, are we still meeting today?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Tech Team",
    avatar: "/placeholder.svg",
    lastMessage: "Mike: I'll push the changes tonight",
    time: "Yesterday",
    unread: 0,
    isGroup: true,
  },
  {
    id: "3",
    name: "David Wilson",
    avatar: "/placeholder.svg",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    name: "Marketing Group",
    avatar: "/placeholder.svg",
    lastMessage: "Jane: The new campaign looks great!",
    time: "Monday",
    unread: 0,
    isGroup: true,
  },
  {
    id: "5",
    name: "Alex Chen",
    avatar: "/placeholder.svg",
    lastMessage: "Let me check the project timeline",
    time: "Monday",
    unread: 0,
  },
];

export function ChatList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newChatContact, setNewChatContact] = useState("");
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredChats = recentChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartNewChat = () => {
    if (newChatContact.trim()) {
      toast({
        title: "New chat started",
        description: `Started a new conversation with ${newChatContact}`,
      });
      setNewChatContact("");
      setIsNewChatDialogOpen(false);
      // In a real app, we would create a new chat and navigate to it
      navigate(`/chats/new-${Date.now()}`);
    }
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <Dialog open={isNewChatDialogOpen} onOpenChange={setIsNewChatDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start New Chat</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">Contact</Label>
                  <Input
                    id="contact"
                    placeholder="Enter contact name"
                    className="col-span-3"
                    value={newChatContact}
                    onChange={(e) => setNewChatContact(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleStartNewChat}>Start Chat</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="recent" className="flex-1 flex flex-col">
        <div className="px-1 border-b">
          <TabsList className="w-full justify-start px-3 h-12">
            <TabsTrigger value="recent" className="text-sm">Recent</TabsTrigger>
            <TabsTrigger value="unread" className="text-sm">Unread</TabsTrigger>
            <TabsTrigger value="groups" className="text-sm">Groups</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <TabsContent value="recent" className="m-0 py-2">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ChatPreview
                  key={chat.id}
                  chat={chat}
                  onClick={() => navigate(`/chats/${chat.id}`)}
                  active={false}
                />
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No messages found
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="m-0 py-2">
            {filteredChats.filter(chat => chat.unread > 0).length > 0 ? (
              filteredChats
                .filter(chat => chat.unread > 0)
                .map((chat) => (
                  <ChatPreview
                    key={chat.id}
                    chat={chat}
                    onClick={() => navigate(`/chats/${chat.id}`)}
                    active={false}
                  />
                ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No unread messages
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="groups" className="m-0 py-2">
            {filteredChats.filter(chat => chat.isGroup).length > 0 ? (
              filteredChats
                .filter(chat => chat.isGroup)
                .map((chat) => (
                  <ChatPreview
                    key={chat.id}
                    chat={chat}
                    onClick={() => navigate(`/chats/${chat.id}`)}
                    active={false}
                  />
                ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No group chats
              </div>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
