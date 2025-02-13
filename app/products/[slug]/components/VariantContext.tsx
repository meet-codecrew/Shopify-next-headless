'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Variant {
  id: string;
  image?: {
    id:string;
    url: string;
    altText?: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface VariantContextType {
  selectedVariant: Variant | null;
  setSelectedVariant: (variant: Variant) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  return (
    <VariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
      {children}
    </VariantContext.Provider>
  );
}

export function useVariantContext() {
  const context = useContext(VariantContext);
  if (context === undefined) {
    throw new Error('useVariantContext must be used within a VariantProvider');
  }
  return context;
}