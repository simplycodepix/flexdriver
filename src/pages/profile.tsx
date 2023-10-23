import { FiCheckCircle } from "react-icons/fi";

import { AppLayout } from "~/features/layout/AppLayout";

import { ProfileForm } from "~/features/profile";
import { Button, Tile } from "~/features/ui";

export default function Profile() {
  return (
    <AppLayout pageTitle="Profile" pageDescription="Profile">
      <div className="mb-8 flex w-full flex-col gap-4">
        <Tile
          startAdornment={<FiCheckCircle />}
          endAdornment={
            <span className="text-xs text-slate-400">Expires 10/05/23</span>
          }
        >
          Subscribed
        </Tile>
        <Tile startAdornment={<FiCheckCircle />}>Connected</Tile>
      </div>

      <ProfileForm />
    </AppLayout>
  );
}
