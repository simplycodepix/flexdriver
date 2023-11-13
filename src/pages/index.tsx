import {
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFilter,
  FiUser,
} from "react-icons/fi";

import { AppLayout } from "~/features/layout/AppLayout";

import { ScheduleSettingsModal, TimerToggle } from "~/features/schedule";
import { useScheduleUI } from "~/features/schedule/schedule.store";

import { FilterSettingsModal } from "~/features/filters";
import { useFiltersUI } from "~/features/filters/filters.store";

import { Menu, MenuButton } from "~/features/ui";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <AppLayout pageTitle="Profile" pageDescription="Profile">
      <div className="flex w-full grow flex-col justify-between pb-12 pt-4">
        <TimerToggle />
        <div className="mt-20">
          <HomeMenu />
        </div>
      </div>

      <ScheduleSettingsModal />
      <FilterSettingsModal />
    </AppLayout>
  );
}

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

function HomeMenu() {
  const router = useRouter();

  const setScheduleSettingsModalOpen = useScheduleUI(
    (state) => state.setSettingsModalOpen,
  );
  const setFiltersSettingsModalOpen = useFiltersUI(
    (state) => state.setSettingsModalOpen,
  );

  const clickHandler = (id: string) => {
    switch (id) {
      case "automatic_start_stop":
        return setScheduleSettingsModalOpen(true);
      case "station_filters":
        return setFiltersSettingsModalOpen(true);
      case "scheduled_blocks":
        return;
      case "profile":
        return router.push("/profile");
    }
  };

  return (
    <Menu>
      {menuButtons.map(({ id, icon, text }) => (
        <MenuButton
          className="px-0"
          key={id}
          startAdornment={icon}
          endAdornment={<FiChevronRight />}
          onClick={() => clickHandler(id)}
        >
          {text}
        </MenuButton>
      ))}
    </Menu>
  );
}
