
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContacts } from "@/context/contacts-context";

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (groupName: string, members: string[]) => void;
}

export function AddGroupModal({ isOpen, onClose, onAddGroup }: AddGroupModalProps) {
  const { contacts } = useContacts();
  const [groupName, setGroupName] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedContacts.length > 0) {
      onAddGroup(groupName, selectedContacts);
      resetForm();
    }
  };
  
  const resetForm = () => {
    setGroupName("");
    setSelectedContacts([]);
  };

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Create a group from your existing contacts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select Members</Label>
              <div className="border rounded-md">
                <ScrollArea className="h-[200px]">
                  <div className="p-4 space-y-4">
                    {contacts.length > 0 ? (
                      contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`contact-${contact.id}`} 
                            checked={selectedContacts.includes(contact.id)}
                            onCheckedChange={() => handleContactToggle(contact.id)}
                          />
                          <Label
                            htmlFor={`contact-${contact.id}`}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contact.name}</span>
                          </Label>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground p-4">
                        No contacts available. Add contacts first.
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>
              {selectedContacts.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!groupName.trim() || selectedContacts.length === 0}
            >
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
