
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatar: string;
  status: string;
}

interface ContactsContextType {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
  getContactById: (id: string) => Contact | undefined;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

// Sample initial contacts data
const initialContacts: Contact[] = [
  { id: "1", name: "Sarah Johnson", avatar: "/placeholder.svg", status: "online" },
  { id: "2", name: "David Wilson", avatar: "/placeholder.svg", status: "offline" },
  { id: "3", name: "Alex Chen", avatar: "/placeholder.svg", status: "online" },
  { id: "4", name: "Michael Brown", avatar: "/placeholder.svg", status: "offline" },
  { id: "5", name: "Emily Davis", avatar: "/placeholder.svg", status: "online" },
];

export function ContactsProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Load contacts from localStorage or use initial data
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (e) {
        console.error("Failed to parse contacts from localStorage", e);
        setContacts(initialContacts);
      }
    } else {
      setContacts(initialContacts);
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (contact: Contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const deleteContact = (id: string) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const getContactById = (id: string) => {
    return contacts.find((contact) => contact.id === id);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        getContactById,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}
