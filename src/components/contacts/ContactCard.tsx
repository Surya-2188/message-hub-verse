
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContactCardProps {
  contact: {
    id: string;
    name: string;
    avatar: string;
    status: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStartChat: (id: string) => void;
}

export function ContactCard({ contact, onEdit, onDelete, onStartChat }: ContactCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={contact.avatar} alt={contact.name} />
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
        <Button variant="ghost" size="icon" onClick={() => onStartChat(contact.id)}>
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(contact.id)}>
          <User className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(contact.id)}>
              Edit Contact
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStartChat(contact.id)}>
              Send Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive" 
              onClick={() => onDelete(contact.id)}
            >
              Delete Contact
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
