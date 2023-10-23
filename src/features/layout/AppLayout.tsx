import Head from "next/head";
import Link from "next/link";
import clsx from "classnames";

import { Button, Tile } from "~/features/ui";
import { FormLabel } from "~/features/ui/form";

export function AppLayout(props: {
  className?: string;
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name="description" content={props.pageDescription} />
      </Head>

      <header className="fixed left-0 right-0 top-0 flex w-full justify-center py-4 ">
        <div className="text-center">
          <Link href="/" className="text-lg font-black text-white">
            <span>MaxGonnaBeRich</span>
          </Link>
          <p className="text-sm text-gray-500">bestmail@gmail.com</p>
        </div>
      </header>

      <main
        className={clsx(
          "flex min-h-screen flex-col items-center justify-center bg-slate-900 px-8 py-4 text-slate-50",
          props.className,
        )}
      >
        {props.children}

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
    </>
  );
}
