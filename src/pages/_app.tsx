import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import HeadComponent from "~/components/HeadComponent";
import { Toaster } from "~/components/ui/sonner"
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import WhiteSpace from "~/components/WhiteSpace";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen h-full w-full flex flex-row justify-center align-center overflow-x-hidden">
        <HeadComponent/>
        <WhiteSpace>
          <Navbar/>
        </WhiteSpace>
        <Component {...pageProps} />
        <WhiteSpace></WhiteSpace>
        <Toaster richColors theme="light"/>
      </div>
      
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
