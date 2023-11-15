import { FiArrowRight, FiX } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import { Button, Tile } from "~/features/ui";

import { useLogsUI } from "./logs.store";

function LogItem() {
  return (
    <Tile
      className="flex-col items-start"
      bodyStyles="w-full flex justify-between items-center"
      startAdornmentStyles="w-full mr-0"
      startAdornment={
        <div className="mb-1 flex items-center justify-between text-sm">
          <strong>9:17:56PM</strong>
          <span>No match</span>
        </div>
      }
    >
      <div className="flex items-center gap-1">
        <span>Oct 03 - 2:15PM</span> <FiArrowRight /> <span>6:15PM</span>
      </div>
      <strong>94 USD</strong>
    </Tile>
  );
}

export function LogsModal() {
  const open = useLogsUI((state) => state.historyModalOpen);
  const setHistoryModalOpen = useLogsUI((state) => state.setHistoryModalOpen);

  const closeModal = () => setHistoryModalOpen(false);

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-2">
          <Dialog.Panel className="mx-auto w-full max-w-sm flex-grow rounded bg-stone-900 p-4 text-white">
            <Dialog.Title className="mb-12 mr-auto flex items-center justify-between text-xl font-bold">
              Logs
              <Button
                size="md"
                color="secondary"
                className="h-8 w-8"
                onClick={closeModal}
              >
                <FiX />
              </Button>
            </Dialog.Title>

            <div className="flex flex-col gap-2">
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
              <LogItem />
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
