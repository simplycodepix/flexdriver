import Head from "next/head";
import Link from "next/link";
import clsx from "classnames";

import { Button, Tile } from "~/features/ui";
import { FormLabel } from "~/features/ui/form";

import { NotificationsModal } from "~/features/notifications";
import { useNotificationsUI } from "~/features/notifications/notifications.store";
import { FiBell } from "react-icons/fi";

export function AppLayout(props: {
  className?: string;
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
}) {
  const setNotificationsModalOpen = useNotificationsUI(
    (state) => state.setModalOpen,
  );

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name="description" content={props.pageDescription} />
      </Head>

      <header className="fixed left-0 right-0 top-0 flex w-full justify-center bg-slate-900 py-4">
        <div className="text-center">
          <Link href="/" className="text-lg font-black text-white">
            <span>MaxGonnaBeRich</span>
          </Link>
          <p className="text-sm text-gray-500">bestmail@gmail.com</p>
        </div>
        <Button
          size="md"
          color="secondary"
          className="absolute right-4 h-8 w-8"
          onClick={() => setNotificationsModalOpen(true)}
        >
          <FiBell />
        </Button>
      </header>

      <main
        className={clsx(
          " bg-slate-900 px-4 pb-8 text-slate-50  md:px-8",
          props.className,
        )}
      >
        <div className="flex min-h-screen flex-col items-center pt-24">
          {props.children}
        </div>

        <div className="mt-8 flex w-full flex-col gap-6">
          <div>
            <FormLabel label="Customer Support:" />
            <Tile
              startAdornment={
                <span className="text-xs font-semibold text-green-700">
                  SMS
                </span>
              }
              endAdornment={
                <a
                  href="tel:+375 (29) 123-45-67"
                  className="text-xs font-semibold text-green-700"
                >
                  Message
                </a>
              }
            >
              +375 (29) 123-45-67
            </Tile>
          </div>

          <Button className="w-full">Logout</Button>

          <nav className="text-center text-sm">
            <ul className="flex flex-col gap-4">
              {[
                { label: "Terms & Conditions", href: "/" },
                {
                  label: "Privacy Policy",
                  href: "/",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link className="text-gray-500" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center text-xs text-gray-400">
            © 2023 All Rights Reserved
          </div>
        </div>
      </main>

      <NotificationsModal />
    </>
  );
}
