
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Camera, X, Check, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: any) => void;
}

export function AddContactModal({ isOpen, onClose, onAddContact }: AddContactModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSubmit = () => {
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

    const newContact = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      avatar: avatar || "/placeholder.svg",
      status: "offline",
    };

    onAddContact(newContact);
    toast({
      title: "Contact added successfully",
      description: `${name} has been added to your contacts`,
    });

    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    setAvatar(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
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
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer"
            >
              {isUploading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </Label>
            <Input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>

          <div className="grid w-full gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Contact name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
                placeholder="Phone number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="Email address"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
