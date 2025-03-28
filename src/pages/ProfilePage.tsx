
import { AppLayout } from "@/components/layout/AppLayout";
import { ProfileView } from "@/components/profile/ProfileView";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit');
  
  return (
    <AppLayout>
      {isEditMode ? <ProfileForm /> : <ProfileView />}
    </AppLayout>
  );
};

export default ProfilePage;
