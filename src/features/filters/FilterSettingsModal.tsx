import {
  FiChevronRight,
  FiCompass,
  FiFilter,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import { Button, Menu, MenuButton } from "~/features/ui";

import { useFiltersUI } from "./filters.store";
import { StationFilterSettings } from "./StationFilterSettings";

const filters = [
  {
    id: "123",
    name: "All days",
    active: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "456",
    name: "Weekdays",
    active: false,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    id: "789",
    name: "Weekends",
    active: false,
    days: ["Sat", "Sun"],
  },
];

function StationFiltersPanel() {
  const setStationFilterId = useFiltersUI((state) => state.setStationFilterId);
  const setSettingsModalOpen = useFiltersUI(
    (state) => state.setSettingsModalOpen,
  );

  return (
    <Dialog.Panel className="mx-auto w-full max-w-sm flex-grow rounded bg-stone-900 p-4 text-white">
      <Dialog.Title className="mb-12 mr-auto flex items-center justify-between text-xl font-bold">
        Filter Settings
        <Button
          size="md"
          color="secondary"
          className="h-8 w-8"
          onClick={() => setSettingsModalOpen(false)}
        >
          <FiX />
        </Button>
      </Dialog.Title>

      <div>
        <div className="mb-6 flex items-center gap-4">
          <FiFilter />
          <span>Station Filters</span>
        </div>

        <Menu className="gap-1">
          {filters.map((filter) => (
            <MenuButton
              key={filter.id}
              className="w-full bg-slate-800 text-left hover:bg-slate-700"
              startAdornment={<FiCompass />}
              endAdornment={
                <div className="flex items-center gap-1">
                  <span className="text-sm">
                    {filter.active ? "On" : "Off"}
                  </span>
                  <FiChevronRight className="text-xl" />
                </div>
              }
              onClick={() => setStationFilterId(filter.id)}
            >
              <span className="text-sm text-white">{filter.name}</span>
              <span className="mt-1 block text-xs font-normal text-gray-400">
                {filter.days.join(", ")}
              </span>
            </MenuButton>
          ))}
          <MenuButton
            className="h-12 w-full bg-slate-800 text-left text-sm text-green-400 hover:bg-slate-700"
            startAdornment={<FiPlus />}
          >
            Add Station Filter
          </MenuButton>
        </Menu>
      </div>
    </Dialog.Panel>
  );
}

function StationFilterSettingsPanel(props: { filterId: string }) {
  const setStationFilterId = useFiltersUI((state) => state.setStationFilterId);

  return (
    <Dialog.Panel className="mx-auto w-full max-w-sm flex-grow rounded bg-stone-900 p-4 text-white">
      <Dialog.Title className="mb-12 mr-auto flex items-center justify-between text-xl font-bold">
        Station Filters
        <Button
          size="md"
          color="secondary"
          className="h-8 w-8"
          onClick={() => setStationFilterId(null)}
        >
          <FiX />
        </Button>
      </Dialog.Title>

      <StationFilterSettings />
    </Dialog.Panel>
  );
}

export function FilterSettingsModal() {
  const open = useFiltersUI((state) => state.settingsModalOpen);
  const stationFilterId = useFiltersUI((state) => state.stationFilterId);
  const setSettingsModalOpen = useFiltersUI(
    (state) => state.setSettingsModalOpen,
  );

  const closeModal = () => setSettingsModalOpen(false);

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-2">
          {stationFilterId ? (
            <StationFilterSettingsPanel filterId={stationFilterId} />
          ) : (
            <StationFiltersPanel />
          )}
        </div>
      </div>
    </Dialog>
  );
}
