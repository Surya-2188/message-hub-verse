
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, User, Users, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ContactCard } from "@/components/contacts/ContactCard";
import { AddContactModal } from "@/components/contacts/AddContactModal";
import { EditContactModal } from "@/components/contacts/EditContactModal";
import { useContacts, Contact } from "@/context/contacts-context";

const ContactsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { contacts, addContact, updateContact, deleteContact, getContactById } = useContacts();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineContacts = filteredContacts.filter(c => c.status === 'online');
  
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

  const selectedContact = selectedContactId ? getContactById(selectedContactId) : null;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
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
            <TabsTrigger value="all" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              All Contacts
            </TabsTrigger>
            <TabsTrigger value="online" className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
              Online
            </TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
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
            <div className="text-center py-12 text-muted-foreground">
              No groups created yet
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
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
    </AppLayout>
  );
};

export default ContactsPage;
