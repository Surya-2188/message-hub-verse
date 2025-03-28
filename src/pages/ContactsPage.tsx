
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, User, Users, UserPlus, UsersRound } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ContactCard } from "@/components/contacts/ContactCard";
import { AddContactModal } from "@/components/contacts/AddContactModal";
import { EditContactModal } from "@/components/contacts/EditContactModal";
import { AddGroupModal } from "@/components/contacts/AddGroupModal";
import { useContacts, Contact } from "@/context/contacts-context";

interface Group {
  id: string;
  name: string;
  members: string[];
  avatar?: string;
}

const ContactsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { contacts, addContact, updateContact, deleteContact, getContactById } = useContacts();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineContacts = filteredContacts.filter(c => c.status === 'online');
  
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddContact = (newContact: Contact) => {
    addContact(newContact);
    setIsAddModalOpen(false);
  };
  
  const handleEditContact = (contact: Contact) => {
    updateContact(contact);
    setIsEditModalOpen(false);
    setSelectedContactId(null);
  };
  
  const handleDeleteContact = (id: string) => {
    deleteContact(id);
    setIsEditModalOpen(false);
    setSelectedContactId(null);
  };
  
  const handleStartChat = (contactId: string) => {
    const contact = getContactById(contactId);
    if (contact) {
      navigate(`/chats/${contactId}`);
      toast({
        title: `Starting chat with ${contact.name}`,
      });
    }
  };
  
  const openEditModal = (id: string) => {
    setSelectedContactId(id);
    setIsEditModalOpen(true);
  };

  const handleAddButtonClick = () => {
    if (activeTab === "groups") {
      setIsAddGroupModalOpen(true);
    } else {
      setIsAddModalOpen(true);
    }
  };

  const handleAddGroup = (groupName: string, memberIds: string[]) => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: groupName,
      members: memberIds,
      avatar: "/placeholder.svg"
    };
    
    setGroups([...groups, newGroup]);
    setIsAddGroupModalOpen(false);
    
    toast({
      title: "Group created",
      description: `Group "${groupName}" with ${memberIds.length} members created successfully`,
    });
  };

  const handleStartGroupChat = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group) {
      navigate(`/chats/${groupId}`);
      toast({
        title: `Starting group chat in ${group.name}`,
      });
    }
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    toast({
      title: "Group deleted",
      description: "The group has been successfully deleted",
    });
  };

  const selectedContact = selectedContactId ? getContactById(selectedContactId) : null;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <Button onClick={handleAddButtonClick}>
            {activeTab === "groups" ? (
              <>
                <UsersRound className="mr-2 h-4 w-4" />
                Add Group
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Contact
              </>
            )}
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
        
        <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              All Contacts
            </TabsTrigger>
            <TabsTrigger value="online" className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
              Online
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center">
              <UsersRound className="mr-2 h-4 w-4" />
              Groups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onEdit={openEditModal}
                      onDelete={handleDeleteContact}
                      onStartChat={handleStartChat}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-muted-foreground">
                    {searchTerm 
                      ? "No contacts found with that name" 
                      : "No contacts yet. Add your first contact!"}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="online" className="mt-0">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {onlineContacts.length > 0 ? (
                  onlineContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onEdit={openEditModal}
                      onDelete={handleDeleteContact}
                      onStartChat={handleStartChat}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-muted-foreground">
                    No online contacts at the moment
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-0">
            <ScrollArea className="h-[calc(100vh-240px)]">
              {filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGroups.map((group) => (
                    <div key={group.id} className="border rounded-md p-4 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={group.avatar} alt={group.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {group.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {group.members.length} members
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteGroup(group.id)}
                        >
                          Delete
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleStartGroupChat(group.id)}
                        >
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  {searchTerm 
                    ? "No groups found with that name" 
                    : "No groups created yet. Create your first group!"}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      <AddContactModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddContact={handleAddContact} 
      />
      
      <EditContactModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedContactId(null);
        }}
        onSave={handleEditContact}
        onDelete={handleDeleteContact}
        contact={selectedContact}
      />

      <AddGroupModal
        isOpen={isAddGroupModalOpen}
        onClose={() => setIsAddGroupModalOpen(false)}
        onAddGroup={handleAddGroup}
      />
    </AppLayout>
  );
};

export default ContactsPage;
