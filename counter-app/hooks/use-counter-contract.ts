import { useEffect, useState } from 'react';
import Counter from '../contracts/counter';
import { useTonClient } from './use-ton-client';
import { useAsyncInitialize } from './use-async-initialize';
import { Address, OpenedContract } from '@ton/core';
import { useTonConnect } from './use-ton-connect';

export function useCounterContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  const [val, setVal] = useState<null | number>();

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQBNL4HEa1cZY6zWXtLpOy4ccAQdasL5-i0221gSEf3vS4yY')
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(Number(val));
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
      return counterContract?.sendIncrement(sender);
    },
  };
}
