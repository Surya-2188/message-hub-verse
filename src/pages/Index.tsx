
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/chats');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
      <div className="text-center space-y-6 max-w-3xl">
        <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
          <MessageSquare className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to MessageHub
        </h1>
        <p className="text-xl text-muted-foreground">
          A secure and elegant messaging platform for all your communication needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/signup')}>
            Create Account
          </Button>
        </div>
        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-2">Secure Messaging</h3>
            <p className="text-muted-foreground">
              End-to-end encryption ensures your conversations remain private and secure.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-2">Group Chats</h3>
            <p className="text-muted-foreground">
              Create group conversations with friends, family, or colleagues.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-2">Media Sharing</h3>
            <p className="text-muted-foreground">
              Share photos, videos, documents, and more with your contacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
