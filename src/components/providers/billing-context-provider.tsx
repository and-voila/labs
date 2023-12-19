import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const frequencies = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' },
];

const BillingContext = createContext(null);

interface BillingProviderProps {
  children: ReactNode;
}

interface BillingContextValue {
  frequency: { value: string; label: string };
  setFrequency: Dispatch<SetStateAction<{ value: string; label: string }>>;
}

export function BillingProvider({ children }: BillingProviderProps) {
  const [frequency, setFrequency] = useState(frequencies[0]);

  const BillingContext = createContext<BillingContextValue | null>(null);

  return (
    <BillingContext.Provider value={{ frequency, setFrequency }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  return useContext(BillingContext);
}
