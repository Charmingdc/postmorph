import SectionWrapper from "./SectionWrapper";
import AvatarUploader from "./actions-components/AvatarUploader";
import FullNameChanger from "./actions-components/FullNameChanger";
import EmailChanger from "./actions-components/EmailChanger";

import type { Profile } from "@/types/index";

const GeneralSettings = ({ profileDetails }: { profileDetails: Profile }) => {
  const { full_name, avatar_url, email } = profileDetails;

  return (
    <SectionWrapper>
      {/* Avatar Uploader Component */}
      <AvatarUploader fullName={full_name} avatarUrl={avatar_url} />

      {/* Full name Changer Component */}
      <FullNameChanger fullName={full_name} />

      {/* Email changer component */}
      <EmailChanger email={email} />
    </SectionWrapper>
  );
};

export default GeneralSettings;
