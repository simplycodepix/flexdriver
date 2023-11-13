import { create } from "zustand";

type State = {
  settingsModalOpen: boolean;
  stationFilterId: string | null;
};

type Actions = {
  setSettingsModalOpen: (open: boolean) => void;
  setStationFilterId: (id: string | null) => void;
};

const getInitialState = (): State => ({
  settingsModalOpen: false,
  stationFilterId: null,
});

export const useFiltersUI = create<State & Actions>((set) => ({
  ...getInitialState(),
  setSettingsModalOpen: (open: boolean) => set({ settingsModalOpen: open }),
  setStationFilterId: (id: string | null) => set({ stationFilterId: id }),
}));
