'use client'

import { useAccount, useEnsName } from 'wagmi'

export function Profile() {
  const { address } = useAccount()
  const { data, error, status } = useEnsName({ address: '0xA1B51e3a56112398B9823A40AFbCAeD263589228' })
  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return <div>ENS name: {data}</div>
}