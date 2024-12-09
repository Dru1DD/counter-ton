"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ReactNode } from "react";

const manifestUrl = 'https://127.0.0.1:3000/tonconnect-manifest.json';
// const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';
export const ClientProvider = ({ children }: { children: ReactNode}) => {
    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            {children}    
        </TonConnectUIProvider>
    )
}
