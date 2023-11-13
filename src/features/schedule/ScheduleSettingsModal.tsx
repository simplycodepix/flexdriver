import { FiX } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import { Button } from "~/features/ui";

import { useScheduleUI } from "./schedule.store";

export function ScheduleSettingsModal() {
  const open = useScheduleUI((state) => state.settingsModalOpen);
  const setSettingsModalOpen = useScheduleUI(
    (state) => state.setSettingsModalOpen,
  );

  const closeModal = () => setSettingsModalOpen(false);

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-2">
          <Dialog.Panel className="mx-auto w-full max-w-sm flex-grow rounded bg-slate-900 p-4 text-white">
            <Dialog.Title className="mb-12 mr-auto flex items-center justify-between text-xl font-bold">
              Schedule Bots
              <Button
                size="md"
                color="secondary"
                className="h-8 w-8"
                onClick={closeModal}
              >
                <FiX />
              </Button>
            </Dialog.Title>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="start-time">Automatic Start Time:</label>
                <input
                  id="start-time"
                  type="time"
                  className="rounded-md bg-slate-800 p-2 text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="end-time">Automatic End Time</label>
                <input
                  id="end-time"
                  type="time"
                  className="rounded-md bg-slate-800 p-2 text-white"
                />
              </div>

              <p className="text-center text-gray-400">
                Edit time and press Schedule to start
              </p>

              <div className="flex justify-center">
                <Button size="lg" className="w-full">
                  Schedule
                </Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
