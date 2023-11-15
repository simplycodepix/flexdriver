import { FiX } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import { Button, Tile } from "~/features/ui";

import { useNotificationsUI } from "./notifications.store";

function NotificationBlock() {
  return (
    <Tile
      className="flex-col items-start"
      bodyStyles="w-full flex justify-between items-center"
      startAdornmentStyles="w-full mr-0"
      startAdornment={
        <div className="mb-1 flex items-center justify-between text-sm">
          <strong>SMS Notifications Notice</strong>
          <span>08/31/23</span>
        </div>
      }
    >
      <div className="flex items-center gap-1">
        <p>
          We will be removing SMS notifications from the app on 08/31/23. Please
          use the email notifications instead.
        </p>
      </div>
    </Tile>
  );
}

export function NotificationsModal() {
  const open = useNotificationsUI((state) => state.modalOpen);
  const setModalOpen = useNotificationsUI((state) => state.setModalOpen);

  const closeModal = () => setModalOpen(false);

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-2">
          <Dialog.Panel className="mx-auto w-full max-w-sm flex-grow rounded bg-stone-900 p-4 text-white">
            <Dialog.Title className="mb-12 mr-auto flex items-center justify-between text-xl font-bold">
              Notifications
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
              <h3 className="font-bold">All Messages</h3>
              <NotificationBlock />
              <NotificationBlock />
              <NotificationBlock />
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
