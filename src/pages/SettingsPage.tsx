
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/ui/theme-provider";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  // Font Size state
  const [fontSize, setFontSize] = useState("medium");
  
  // Privacy Settings state
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(true);

  // Notification Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationSounds, setNotificationSounds] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);
  const [groupNotifications, setGroupNotifications] = useState(true);
  const [mentionsOnly, setMentionsOnly] = useState(false);

  // Advanced Settings state
  const [autoDownload, setAutoDownload] = useState(true);

  // Blocked Users Dialog state
  const [isBlockedUsersDialogOpen, setIsBlockedUsersDialogOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([
    { id: "1", name: "John Doe", avatar: "/placeholder.svg" },
    { id: "2", name: "Jane Smith", avatar: "/placeholder.svg" }
  ]);
  const [userToUnblock, setUserToUnblock] = useState<string | null>(null);

  // Clear Cache Dialog state
  const [isClearCacheDialogOpen, setIsClearCacheDialogOpen] = useState(false);

  // Export Dialog state
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  // Change Password Dialog state
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Delete Account Dialog state
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = 
      size === "small" ? "14px" : size === "large" ? "18px" : "16px";
    toast({
      title: "Font size updated",
      description: `Font size set to ${size}`,
    });
  };

  const handleUnblockUser = (userId: string) => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
    toast({
      title: "User unblocked",
      description: "The user has been successfully unblocked",
    });
  };

  const handleClearCache = () => {
    setIsClearCacheDialogOpen(false);
    toast({
      title: "Cache cleared",
      description: "Your cache has been successfully cleared",
    });
  };

  const handleExportHistory = () => {
    setIsExportDialogOpen(false);
    toast({
      title: "Chat history exported",
      description: "Your chat history has been exported successfully",
    });
    // In a real app, this would trigger a download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Chat history export placeholder");
      link.download = "chat_history.txt";
      link.click();
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsChangePasswordDialogOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully",
    });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      toast({
        title: "Error",
        description: "Please type DELETE to confirm account deletion",
        variant: "destructive"
      });
      return;
    }
    
    setIsDeleteAccountDialogOpen(false);
    setDeleteConfirmation("");
    
    toast({
      title: "Account deleted",
      description: "Your account has been successfully deleted",
    });
    // In a real app, this would redirect to a landing page or login
    setTimeout(() => {
      localStorage.removeItem('user');
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="appearance">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1">Privacy</TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark mode
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-theme">Use System Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Follow your system's theme settings
                    </p>
                  </div>
                  <Switch 
                    id="system-theme" 
                    checked={theme === "system"}
                    onCheckedChange={(checked) => checked && setTheme("system")} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable animations
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Font Size</CardTitle>
                <CardDescription>
                  Adjust the font size of text in the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant={fontSize === "small" ? "default" : "outline"}
                    onClick={() => handleFontSizeChange("small")}
                  >
                    Small
                  </Button>
                  <Button 
                    variant={fontSize === "medium" ? "default" : "outline"}
                    onClick={() => handleFontSizeChange("medium")}
                  >
                    Medium
                  </Button>
                  <Button 
                    variant={fontSize === "large" ? "default" : "outline"}
                    onClick={() => handleFontSizeChange("large")}
                  >
                    Large
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when the app is closed
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound">Notification Sounds</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for incoming notifications
                    </p>
                  </div>
                  <Switch 
                    id="sound" 
                    checked={notificationSounds}
                    onCheckedChange={setNotificationSounds}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-preview">Message Preview</Label>
                    <p className="text-sm text-muted-foreground">
                      Show message content in notification
                    </p>
                  </div>
                  <Switch 
                    id="show-preview" 
                    checked={messagePreview}
                    onCheckedChange={setMessagePreview}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Group Notifications</CardTitle>
                <CardDescription>
                  Configure notifications for group chats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="group-notifications">Group Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for group messages
                    </p>
                  </div>
                  <Switch 
                    id="group-notifications" 
                    checked={groupNotifications}
                    onCheckedChange={setGroupNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mentions-only">Mentions Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Only notify when you are mentioned in a group
                    </p>
                  </div>
                  <Switch 
                    id="mentions-only" 
                    checked={mentionsOnly}
                    onCheckedChange={setMentionsOnly}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="online-status">Online Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you are online
                    </p>
                  </div>
                  <Switch 
                    id="online-status" 
                    checked={onlineStatus}
                    onCheckedChange={setOnlineStatus}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="read-receipts">Read Receipts</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others know when you've read their messages
                    </p>
                  </div>
                  <Switch 
                    id="read-receipts" 
                    checked={readReceipts}
                    onCheckedChange={setReadReceipts}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="typing-indicator">Typing Indicator</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you are typing a message
                    </p>
                  </div>
                  <Switch 
                    id="typing-indicator" 
                    checked={typingIndicator}
                    onCheckedChange={setTypingIndicator}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Blocked Users</CardTitle>
                <CardDescription>
                  Manage users you've blocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blockedUsers.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {blockedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleUnblockUser(user.id)}
                        >
                          Unblock
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    You haven't blocked any users
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsBlockedUsersDialogOpen(true)}
                >
                  Manage Blocked Users
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data & Storage</CardTitle>
                <CardDescription>
                  Manage your data and storage settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-download">Auto-Download Media</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically download media files
                    </p>
                  </div>
                  <Switch 
                    id="auto-download" 
                    checked={autoDownload}
                    onCheckedChange={setAutoDownload}
                  />
                </div>
                
                <div>
                  <Label>Storage Usage</Label>
                  <div className="mt-2 p-4 rounded-md border bg-muted/50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Photos</span>
                      <span className="text-sm font-medium">2.4 MB</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Videos</span>
                      <span className="text-sm font-medium">4.8 MB</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Documents</span>
                      <span className="text-sm font-medium">1.2 MB</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Total</span>
                      <span className="text-sm font-medium">8.4 MB</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsClearCacheDialogOpen(true)}
                >
                  Clear Cache
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Manage your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsExportDialogOpen(true)}
                >
                  Export Chat History
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsChangePasswordDialogOpen(true)}
                >
                  Change Password
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => setIsDeleteAccountDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      {/* Blocked Users Management Dialog */}
      <Dialog open={isBlockedUsersDialogOpen} onOpenChange={setIsBlockedUsersDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Blocked Users</DialogTitle>
            <DialogDescription>
              Review and manage your blocked contacts
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {blockedUsers.length > 0 ? (
              <div className="space-y-4">
                {blockedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUnblockUser(user.id)}
                    >
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                You haven't blocked any users
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear Cache Dialog */}
      <Dialog open={isClearCacheDialogOpen} onOpenChange={setIsClearCacheDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Clear Cache</DialogTitle>
            <DialogDescription>
              This will clear all cached data including media files.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              You will need to redownload any media you want to view again.
              This won't delete your messages.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClearCacheDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearCache}>
              Clear Cache
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Chat History Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Chat History</DialogTitle>
            <DialogDescription>
              This will export all your chat messages as a text file.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              The export includes text messages only and excludes media files.
              The process may take a few moments depending on chat history size.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportHistory}>
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your account password
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsChangePasswordDialogOpen(false);
              setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
              });
            }}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-destructive font-medium">
              To confirm, type "DELETE" in the field below:
            </p>
            <Input 
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsDeleteAccountDialogOpen(false);
              setDeleteConfirmation("");
            }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default SettingsPage;
