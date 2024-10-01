'use client'

import { config } from '../../config'
import { WagmiProvider } from 'wagmi'

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>
}