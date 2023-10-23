import {
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFilter,
  FiUser,
} from "react-icons/fi";

import { AppLayout } from "~/features/layout/AppLayout";

import { StartStopButton } from "~/features/schedule";

import { Button, Menu, MenuButton, Tile } from "~/features/ui";

export default function Home() {
  return (
    <AppLayout pageTitle="Profile" pageDescription="Profile" className="pt-0">
      <div className="flex min-h-screen w-full flex-col justify-between pb-12 pt-4">
        <div className="flex grow items-center justify-center">
          <StartStopButton />
        </div>
        <HomeMenu />
      </div>
    </AppLayout>
  );
}

function HomeMenu() {
  const menuButtons = [
    {
      id: "automatic_start_stop",
      icon: <FiClock />,
      text: "Automatic Start & Stop",
    },
    { id: "station_filters", icon: <FiFilter />, text: "Station Filters" },
    {
      id: "scheduled_blocks",
      icon: <FiCalendar />,
      text: "Scheduled Blocks",
    },
    { id: "profile", icon: <FiUser />, text: "Profile" },
  ];

  return (
    <Menu>
      {menuButtons.map(({ id, icon, text }) => (
        <MenuButton
          className="px-0"
          key={id}
          startAdornment={icon}
          endAdornment={<FiChevronRight />}
        >
          {text}
        </MenuButton>
      ))}
    </Menu>
  );
}
