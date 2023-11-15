import { create } from "zustand";

type State = {
  modalOpen: boolean;
};

type Actions = {
  setModalOpen: (open: boolean) => void;
};

const getInitialState = (): State => ({
  modalOpen: false,
});

export const useNotificationsUI = create<State & Actions>((set) => ({
  ...getInitialState(),
  setModalOpen: (open: boolean) => set({ modalOpen: open }),
}));
