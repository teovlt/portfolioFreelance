import { createContext, useContext, useState, type ReactNode } from "react";

type PackageContextType = {
  selectedPackage: string | null;
  setSelectedPackage: (pkg: string | null) => void;
};

const PackageContext = createContext<PackageContextType>({
  selectedPackage: null,
  setSelectedPackage: () => {},
});

export function PackageProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  return <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>{children}</PackageContext.Provider>;
}

export const usePackage = () => useContext(PackageContext);
