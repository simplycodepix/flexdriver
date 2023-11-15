import { create } from "zustand";

type State = {
  scheduledBlocksModalOpen: boolean;
  settingsModalOpen: boolean;
  isTimerRunning: boolean;
  timerStartTime: number;
};

type Actions = {
  setScheduledBlocksModalOpen: (open: boolean) => void;
  setSettingsModalOpen: (open: boolean) => void;
  startTimer: (startTime: number) => void;
  stopTimer: () => void;
};

const getInitialState = (): State => ({
  scheduledBlocksModalOpen: false,
  settingsModalOpen: false,
  isTimerRunning: false,
  timerStartTime: 0,
});

export const useScheduleUI = create<State & Actions>((set) => ({
  ...getInitialState(),
  setSettingsModalOpen: (open: boolean) => set({ settingsModalOpen: open }),
  setScheduledBlocksModalOpen: (open: boolean) =>
    set({ scheduledBlocksModalOpen: open }),
  startTimer: (startTime: number) =>
    set({ isTimerRunning: true, timerStartTime: startTime }),
  stopTimer: () => set({ isTimerRunning: false }),
}));
