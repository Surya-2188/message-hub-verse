
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Mail, Phone, User, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ProfileView() {
  const [user, setUser] = useState<any>(null);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "Everyone",
    lastSeen: "Nobody",
    readReceipts: "Everyone"
  });
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    messagePreview: true,
    sound: true
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Privacy settings handlers
  const togglePrivacySetting = (setting: string) => {
    const options = {
      profileVisibility: ["Everyone", "Contacts", "Nobody"],
      lastSeen: ["Everyone", "Contacts", "Nobody"],
      readReceipts: ["Everyone", "Contacts", "Nobody"]
    };
    
    const currentValue = privacySettings[setting as keyof typeof privacySettings];
    const currentIndex = options[setting as keyof typeof options].indexOf(currentValue);
    const nextIndex = (currentIndex + 1) % options[setting as keyof typeof options].length;
    const nextValue = options[setting as keyof typeof options][nextIndex];
    
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: nextValue
    }));
    
    toast({
      title: "Setting updated",
      description: `${setting} is now set to ${nextValue}`
    });
  };

  // Notification settings handlers
  const toggleNotificationSetting = (setting: string) => {
    setNotificationSettings(prev => {
      const newValue = !prev[setting as keyof typeof prev];
      
      toast({
        title: "Setting updated",
        description: `${setting} is now ${newValue ? 'enabled' : 'disabled'}`
      });
      
      return {
        ...prev,
        [setting]: newValue
      };
    });
  };

  // Security handlers
  const handleTwoFactorAuth = () => {
    toast({
      title: "Two-factor authentication",
      description: "This feature will be available soon."
    });
  };
  
  const handleChangePassword = () => {
    navigate("/settings");
    toast({
      title: "Change password",
      description: "You can change your password in the settings page."
    });
  };
  
  const handleViewSessions = () => {
    navigate("/settings");
    toast({
      title: "Active sessions",
      description: "You can view your active sessions in the settings page."
    });
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('user');
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/profile/edit")}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You'll need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-4xl">
              {user.name ? user.name[0] : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            {user.username && <p className="text-muted-foreground">@{user.username}</p>}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.bio && (
              <div className="border-t pt-4 mt-4">
                <p className="text-muted-foreground mb-2">Bio</p>
                <p>{user.bio}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="privacy" className="flex-1">Privacy</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="privacy" className="pt-4">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Who can see my profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Control who can see your profile information
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => togglePrivacySetting('profileVisibility')}
                >
                  {privacySettings.profileVisibility}
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Last seen</h3>
                  <p className="text-sm text-muted-foreground">
                    Control who can see when you were last online
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => togglePrivacySetting('lastSeen')}
                >
                  {privacySettings.lastSeen}
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Read receipts</h3>
                  <p className="text-sm text-muted-foreground">
                    Let others know when you've read their messages
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => togglePrivacySetting('readReceipts')}
                >
                  {privacySettings.readReceipts}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when you're not using the app
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleNotificationSetting('pushNotifications')}
                >
                  {notificationSettings.pushNotifications ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Message preview</h3>
                  <p className="text-sm text-muted-foreground">
                    Show message content in notifications
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleNotificationSetting('messagePreview')}
                >
                  {notificationSettings.messagePreview ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Sound</h3>
                  <p className="text-sm text-muted-foreground">
                    Play sound for new messages
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleNotificationSetting('sound')}
                >
                  {notificationSettings.sound ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-factor authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTwoFactorAuth}
                >
                  Disabled
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Change password</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your password regularly for better security
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleChangePassword}
                >
                  Change
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Active sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage devices where you're currently logged in
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewSessions}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
