"use client";
import { Box } from "@/components/core/box";
import Button from "@/components/core/button";
import Input from "@/components/core/input";
import ProfilePictureUpload, {
  ProfileValueType,
} from "@/components/core/profile-edit";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";
import Tabs, { TabPanel } from "@/components/core/tabs";
import TextArea from "@/components/core/textArea";
import { toast } from "@/components/toast/toast";
import { users } from "@/data/dummy";
import { IUser } from "@/types/system/slice";
import { Key, User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const user = users[0] as IUser;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<ProfileValueType>(user.photo || null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SidebarSkeleton>
      <Tabs
        variant="primary"
        tabs={[
          { label: "Profile Info", value: "profile", icon: <User size={14} /> },
          {
            label: "Change Password",
            value: "password",
            icon: <Key size={14} />,
          },
        ]}
      >
        <TabPanel value="profile">
          <div className="grid ">
            <Box>
              <ProfilePictureUpload
                value={photo}
                setValue={setPhoto}
                isUpdate
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Full Name"
                  value={name}
                  setter={setName}
                  placeholder="Enter full name"
                />

                {/* Email */}
                <Input
                  label="Email"
                  value={email}
                  setter={setEmail}
                  placeholder="Enter email"
                />

                {/* Phone */}
                <Input
                  label="Phone"
                  value={phone}
                  setter={setPhone}
                  placeholder="Enter phone number"
                />

                {/* Bio */}
                <div className="col-span-2">
                  <TextArea
                    label="Bio"
                    value={bio}
                    setter={setBio}
                    placeholder="Write a short bio..."
                    variant="primary"
                  />
                </div>
              </div>
              <Button className="mt-4" variant="primary">
                Save Profile
              </Button>
            </Box>
          </div>
        </TabPanel>

        <TabPanel value="password">
          <Box>
            <div className="space-y-3 mb-4 grid grid-cols-2 gap-3">
              <Input
                label="Current Password"
                value={currentPassword}
                setter={setCurrentPassword}
                placeholder="Enter current password"
                type="password"
                variant="primary"
              />

              <Input
                label="New Password"
                value={newPassword}
                setter={setNewPassword}
                placeholder="Enter new password"
                type="password"
                variant="primary"
              />

              <Input
                label="Confirm New Password"
                value={confirmPassword}
                setter={setConfirmPassword}
                placeholder="Confirm new password"
                type="password"
                variant="primary"
              />
            </div>
            <Button
              onClick={() => {
                toast.error("Profile saved successfully");
              }}
              variant="primary"
            >
              Update Password
            </Button>
          </Box>
        </TabPanel>
      </Tabs>
    </SidebarSkeleton>
  );
}
