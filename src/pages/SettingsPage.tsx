
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

const SettingsPage = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
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
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-theme">Use System Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Follow your system's theme settings
                    </p>
                  </div>
                  <Switch id="system-theme" defaultChecked />
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
                  <Button variant="outline">Small</Button>
                  <Button variant="default">Medium</Button>
                  <Button variant="outline">Large</Button>
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
                  <Switch id="push-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound">Notification Sounds</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for incoming notifications
                    </p>
                  </div>
                  <Switch id="sound" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-preview">Message Preview</Label>
                    <p className="text-sm text-muted-foreground">
                      Show message content in notification
                    </p>
                  </div>
                  <Switch id="show-preview" defaultChecked />
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
                  <Switch id="group-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mentions-only">Mentions Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Only notify when you are mentioned in a group
                    </p>
                  </div>
                  <Switch id="mentions-only" />
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
                  <Switch id="online-status" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="read-receipts">Read Receipts</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others know when you've read their messages
                    </p>
                  </div>
                  <Switch id="read-receipts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="typing-indicator">Typing Indicator</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you are typing a message
                    </p>
                  </div>
                  <Switch id="typing-indicator" defaultChecked />
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
                <div className="text-center py-8 text-muted-foreground">
                  You haven't blocked any users
                </div>
                <Button variant="outline" className="w-full">
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
                  <Switch id="auto-download" defaultChecked />
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
                
                <Button variant="outline" className="w-full">
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
                <Button variant="outline" className="w-full">
                  Export Chat History
                </Button>
                
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                
                <Button variant="destructive" className="w-full">
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
    </AppLayout>
  );
};

export default SettingsPage;
