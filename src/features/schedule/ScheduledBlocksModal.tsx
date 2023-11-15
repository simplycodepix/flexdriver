import { FiArrowRight, FiTrash, FiX } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import { Button, Tile } from "~/features/ui";

import { useScheduleUI } from "./schedule.store";

function ScheduledBlock() {
  return (
    <div className="flex flex-col gap-2">
      <Tile
        className="flex-col items-start"
        bodyStyles="w-full flex justify-between items-center"
        startAdornmentStyles="w-full mr-0"
        startAdornment={
          <div className="mb-1 flex items-center justify-between text-sm">
            <strong>Sunday, 10/1</strong>
            <span>Filters Matched</span>
          </div>
        }
      >
        <div className="flex items-center gap-1">
          <span>4:15AM</span> <FiArrowRight /> <span>7:45AM</span>
        </div>
        <strong>150.5 USD</strong>
      </Tile>

      <Button color="secondary" startAdornment={<FiTrash />}>
        Forfeit Block
      </Button>
    </div>
  );
}

export function ScheduledBlocksModal() {
  const open = useScheduleUI((state) => state.scheduledBlocksModalOpen);
  const setScheduledBlocksModalOpen = useScheduleUI(
    (state) => state.setScheduledBlocksModalOpen,
  );

  const closeModal = () => setScheduledBlocksModalOpen(false);

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-2">
          <Dialog.Panel className="mx-auto w-full max-w-sm flex-grow rounded bg-stone-900 p-4 text-white">
            <Dialog.Title className="mb-12 mr-auto flex items-center justify-between text-xl font-bold">
              Scheduled Blocks
              <Button
                size="md"
                color="secondary"
                className="h-8 w-8"
                onClick={closeModal}
              >
                <FiX />
              </Button>
            </Dialog.Title>

            <div className="flex flex-col gap-4">
              <ScheduledBlock />
              <ScheduledBlock />
              <ScheduledBlock />
              <ScheduledBlock />
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
