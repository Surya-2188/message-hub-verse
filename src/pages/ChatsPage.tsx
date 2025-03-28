
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatList } from "@/components/chat/ChatList";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Outlet, useParams } from "react-router-dom";

const ChatsPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  
  return (
    <AppLayout>
      <div className="flex h-full">
        <div className="w-80 h-full">
          <ChatList />
        </div>
        <div className="flex-1">
          {chatId ? (
            <ChatWindow />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a chat from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatsPage;
