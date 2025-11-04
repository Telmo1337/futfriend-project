import BaseView from "../BaseView";
import ProfileHeader from "./components/ProfileHeader";
import useProfile from "./hooks/useProfile";

const Profile = () => {
  const { user, loading, error } = useProfile();

  return (
    <BaseView title="Perfil" loading={loading} error={error}>
      <ProfileHeader user={user} />
    </BaseView>
  );
};

export default Profile;
