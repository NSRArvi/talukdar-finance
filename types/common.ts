import type { ReactNode } from "react";

export type BaseComponentProps = {
  className?: string;
  children?: ReactNode;
};

export type ServiceType =
  | "home-loan"
  | "car-loan"
  | "personal-loan"
  | "business-finance"
  | "refinance"
  | "commercial-loan";

