
import { useState, useEffect } from "react";
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
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Mock notifications
const initialNotifications = [
  { 
    id: "1", 
    content: "Sarah Johnson sent you a message", 
    time: "5 minutes ago", 
    isRead: false 
  },
  { 
    id: "2", 
    content: "New update available", 
    time: "1 hour ago", 
    isRead: false 
  },
  { 
    id: "3", 
    content: "Mike added you to Tech Team group", 
    time: "2 hours ago", 
    isRead: true 
  }
];

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
    });
    navigate('/login');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.key === 'Enter' && searchQuery.trim()) {
      toast({
        title: "Search results",
        description: `Searching for "${searchQuery}"`,
      });
      // In a real app, this would navigate to search results or filter the UI
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
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
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <ScrollArea className="max-h-[300px]">
                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn(
                            "px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors",
                            !notification.isRead && "bg-muted/30"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "h-2 w-2 rounded-full mt-1.5",
                              notification.isRead ? "bg-muted-foreground/50" : "bg-primary"
                            )} />
                            <div className="flex-1">
                              <p className="text-sm mb-1">{notification.content}</p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No notifications</p>
                    </div>
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
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
