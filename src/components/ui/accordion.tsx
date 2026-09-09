"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type AccordionContextValue = {
  value: string | null;
  onValueChange: (value: string | null) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const ItemContext = createContext<string | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within Accordion");
  return ctx;
}

export function Accordion({
  value,
  onValueChange,
  children,
  className,
}: {
  value: string | null;
  onValueChange: (value: string | null) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AccordionContext.Provider value={{ value, onValueChange }}>
      <div className={cn("flex flex-col gap-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: open } = useAccordion();
  const isOpen = open === value;

  return (
    <ItemContext.Provider value={value}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "overflow-hidden rounded-2xl border border-line bg-panel",
          className,
        )}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const item = useContext(ItemContext);
  const { value, onValueChange } = useAccordion();
  if (!item) throw new Error("AccordionTrigger must be inside AccordionItem");

  const isOpen = value === item;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => onValueChange(isOpen ? null : item)}
      className={cn(
        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink/40",
        className,
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <ChevronDown
        aria-hidden
        className={cn(
          "size-4 shrink-0 text-muted transition-transform duration-200",
          isOpen && "rotate-180 text-foam",
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const item = useContext(ItemContext);
  const { value } = useAccordion();
  if (!item) throw new Error("AccordionContent must be inside AccordionItem");
  if (value !== item) return null;

  return (
    <div
      className={cn(
        "border-t border-line px-5 py-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
