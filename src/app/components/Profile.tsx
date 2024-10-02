'use client'

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Profile() {
  const { address, } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button className='text-red-500' onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}