
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Camera } from "lucide-react";

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user from localStorage
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : {
    name: "",
    email: "",
    phone: "",
    avatar: "/placeholder.svg",
    bio: "",
  };
  
  const [formData, setFormData] = useState(initialUser);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData((prev: any) => ({
            ...prev,
            avatar: event.target?.result
          }));
          
          toast({
            title: "Profile picture updated",
            description: "Your profile picture has been uploaded successfully.",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call to update profile
      setTimeout(() => {
        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(formData));
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
        
        navigate("/profile");
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <Button variant="outline" onClick={() => navigate("/profile")}>
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                {formData.name ? formData.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
              onClick={handleFileInputClick}
              type="button"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Button 
            variant="link" 
            className="text-sm"
            type="button"
            onClick={handleFileInputClick}
          >
            Change profile picture
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="Tell us a bit about yourself"
            value={formData.bio || ""}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
