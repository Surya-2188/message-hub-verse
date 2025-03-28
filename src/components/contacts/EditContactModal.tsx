
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Camera, X, Check, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatar: string;
  status: string;
}

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  onDelete: (id: string) => void;
  contact: Contact | null;
}

export function EditContactModal({ isOpen, onClose, onSave, onDelete, contact }: EditContactModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setPhone(contact.phone || "");
      setEmail(contact.email || "");
      setAvatar(contact.avatar || null);
    }
  }, [contact]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim() && !email.trim()) {
      toast({
        title: "Phone number or email is required",
        variant: "destructive",
      });
      return;
    }

    if (!contact) return;

    const updatedContact = {
      ...contact,
      name,
      phone,
      email,
      avatar: avatar || "/placeholder.svg",
    };

    onSave(updatedContact);
    toast({
      title: "Contact updated successfully",
    });

    onClose();
  };

  const handleDelete = () => {
    if (!contact) return;
    
    onDelete(contact.id);
    toast({
      title: "Contact deleted",
      description: `${contact.name} has been removed from your contacts`,
    });
    
    onClose();
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {avatar ? (
                <AvatarImage src={avatar} alt="Contact Photo" />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {name ? name[0]?.toUpperCase() : <Camera className="h-8 w-8" />}
                </AvatarFallback>
              )}
            </Avatar>
            
            <Label 
              htmlFor="avatar-edit" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer"
            >
              {isUploading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </Label>
            <Input 
              id="avatar-edit" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>

          <div className="grid w-full gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Contact name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="edit-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
                placeholder="Phone number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="Email address"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button type="button" variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              <Check className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
