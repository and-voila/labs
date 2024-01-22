import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useContext, useMemo, useState } from 'react';

const frequencies = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' },
];

interface BillingContextValue {
  frequency: { value: string; label: string };
  setFrequency: Dispatch<SetStateAction<{ value: string; label: string }>>;
}

const BillingContext = createContext<BillingContextValue | null>(null);

export function BillingProvider({ children }: { children: ReactNode }) {
  const [frequency, setFrequency] = useState<BillingContextValue['frequency']>(
    frequencies[0] ?? { value: 'monthly', label: 'Monthly' },
  );

  const value = useMemo(() => ({ frequency, setFrequency }), [frequency]);

  return (
    <BillingContext.Provider value={value}>{children}</BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
}
