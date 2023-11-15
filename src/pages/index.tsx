import { useRouter } from "next/navigation";
import {
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFilter,
  FiList,
  FiUser,
} from "react-icons/fi";

import { AppLayout } from "~/features/layout/AppLayout";

import {
  ScheduleSettingsModal,
  ScheduledBlocksModal,
  TimerToggle,
} from "~/features/schedule";
import { useScheduleUI } from "~/features/schedule/schedule.store";

import { FilterSettingsModal } from "~/features/filters";
import { useFiltersUI } from "~/features/filters/filters.store";

import { LogsModal } from "~/features/logs";
import { useLogsUI } from "~/features/logs/logs.store";

import { Menu, MenuButton } from "~/features/ui";

export default function Home() {
  return (
    <AppLayout pageTitle="Profile" pageDescription="Profile">
      <div className="flex w-full grow flex-col justify-between pb-12">
        <TimerToggle />
        <div className="mt-20">
          <HomeMenu />
        </div>
      </div>

      <ScheduleSettingsModal />
      <FilterSettingsModal />
      <LogsModal />
      <ScheduledBlocksModal />
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
  {
    id: "logs",
    icon: <FiList />,
    text: "Logs",
  },
  { id: "profile", icon: <FiUser />, text: "Profile" },
];

function HomeMenu() {
  const router = useRouter();

  const setScheduleSettingsModalOpen = useScheduleUI(
    (state) => state.setSettingsModalOpen,
  );
  const setScheduledBlocksModalOpen = useScheduleUI(
    (state) => state.setScheduledBlocksModalOpen,
  );
  const setFiltersSettingsModalOpen = useFiltersUI(
    (state) => state.setSettingsModalOpen,
  );
  const setLogHistoryModalOpen = useLogsUI(
    (state) => state.setHistoryModalOpen,
  );

  const clickHandler = (id: string) => {
    switch (id) {
      case "automatic_start_stop":
        return setScheduleSettingsModalOpen(true);
      case "station_filters":
        return setFiltersSettingsModalOpen(true);
      case "scheduled_blocks":
        return setScheduledBlocksModalOpen(true);
      case "logs":
        return setLogHistoryModalOpen(true);
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
