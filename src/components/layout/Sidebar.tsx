
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, MessageSquare, User, Settings, Search, 
  LogOut, Bell, X, Menu
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
    });
    navigate('/login');
  };

  const navItems = [
    { 
      href: "/chats", 
      icon: <MessageSquare className="h-5 w-5" />, 
      label: "Chats" 
    },
    { 
      href: "/contacts", 
      icon: <Users className="h-5 w-5" />, 
      label: "Contacts" 
    },
    { 
      href: "/profile", 
      icon: <User className="h-5 w-5" />, 
      label: "Profile" 
    },
    { 
      href: "/settings", 
      icon: <Settings className="h-5 w-5" />, 
      label: "Settings" 
    },
  ];

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isSidebarOpen && isMobile ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground w-64 border-r border-sidebar-border flex flex-col h-full z-50 transition-transform duration-300",
          isMobile && !isSidebarOpen && "-translate-x-full",
          isMobile && "fixed"
        )}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <h1 className="font-bold text-lg">MessageHub</h1>
          </div>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="w-full bg-sidebar-accent text-sidebar-accent-foreground rounded-md py-2 pl-9 pr-4 text-sm placeholder:text-sidebar-accent-foreground/60 focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
              placeholder="Search..."
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sm font-medium">
                  {JSON.parse(localStorage.getItem('user') || '{"name":""}').name[0]}
                </span>
              </div>
              <div className="text-sm font-medium truncate">
                {JSON.parse(localStorage.getItem('user') || '{"name":"User"}').name}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-sidebar-accent bg-sidebar-accent/30 hover:bg-sidebar-accent/50 text-sidebar-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </aside>
    </>
  );
}
