import { create } from "zustand";

type State = {
  settingsModalOpen: boolean;
  isTimerRunning: boolean;
  timerStartTime: number;
};

type Actions = {
  setSettingsModalOpen: (open: boolean) => void;
  startTimer: (startTime: number) => void;
  stopTimer: () => void;
};

const getInitialState = (): State => ({
  settingsModalOpen: false,
  isTimerRunning: false,
  timerStartTime: 0,
});

export const useScheduleUI = create<State & Actions>((set) => ({
  ...getInitialState(),
  setSettingsModalOpen: (open: boolean) => set({ settingsModalOpen: open }),
  startTimer: (startTime: number) =>
    set({ isTimerRunning: true, timerStartTime: startTime }),
  stopTimer: () => set({ isTimerRunning: false }),
}));
