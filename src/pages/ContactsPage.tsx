
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, User, MessageSquare, MoreVertical } from "lucide-react";
import { useState } from "react";

// Mock contacts data
const contacts = [
  { id: "1", name: "Sarah Johnson", avatar: "/placeholder.svg", status: "online" },
  { id: "2", name: "David Wilson", avatar: "/placeholder.svg", status: "offline" },
  { id: "3", name: "Alex Chen", avatar: "/placeholder.svg", status: "online" },
  { id: "4", name: "Michael Brown", avatar: "/placeholder.svg", status: "offline" },
  { id: "5", name: "Emily Davis", avatar: "/placeholder.svg", status: "online" },
  { id: "6", name: "Jessica Taylor", avatar: "/placeholder.svg", status: "offline" },
  { id: "7", name: "James Martinez", avatar: "/placeholder.svg", status: "online" },
  { id: "8", name: "Robert Thompson", avatar: "/placeholder.svg", status: "offline" },
];

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Contacts</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {contact.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                              contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {contact.status === "online" ? "Online" : "Offline"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <User className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-muted-foreground">
                    No contacts found
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="online" className="mt-0">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.filter(c => c.status === 'online').length > 0 ? (
                  filteredContacts
                    .filter(c => c.status === 'online')
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {contact.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                          </div>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">Online</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-muted-foreground">
                    No online contacts found
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-0">
            <div className="text-center py-12 text-muted-foreground">
              No groups created yet
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
