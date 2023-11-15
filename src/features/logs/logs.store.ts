import { create } from "zustand";

type State = {
  historyModalOpen: boolean;
};

type Actions = {
  setHistoryModalOpen: (open: boolean) => void;
};

const getInitialState = (): State => ({
  historyModalOpen: false,
});

export const useLogsUI = create<State & Actions>((set) => ({
  ...getInitialState(),
  setHistoryModalOpen: (open: boolean) => set({ historyModalOpen: open }),
}));
