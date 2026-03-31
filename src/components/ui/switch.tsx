"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";
import { cn } from "@/utils/cn";

type CheckedChangeDetails = Parameters<
  NonNullable<
    React.ComponentProps<typeof SwitchPrimitive.Root>["onCheckedChange"]
  >
>[1];

const SwitchContext = React.createContext<{
  isChecked: boolean;
  handleCheckedChange: (
    val: boolean,
    eventDetails?: CheckedChangeDetails,
  ) => void;
} | null>(null);

export interface SwitchRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (val: boolean, eventDetails?: CheckedChangeDetails) => void;
}

function SwitchRoot({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  children,
  ...props
}: SwitchRootProps) {
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false,
  );
  const isChecked = controlledChecked ?? internalChecked;

  const handleCheckedChange = (
    val: boolean,
    eventDetails?: CheckedChangeDetails,
  ) => {
    if (controlledChecked === undefined) {
      setInternalChecked(val);
    }
    onCheckedChange?.(val, eventDetails);
  };

  return (
    <SwitchContext.Provider value={{ isChecked, handleCheckedChange }}>
      <div className={cn("flex items-center gap-3", className)} {...props}>
        {children}
      </div>
    </SwitchContext.Provider>
  );
}

export interface SwitchControlProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    "checked" | "defaultChecked" | "onCheckedChange"
  > {}

function SwitchControl({ className, ...props }: SwitchControlProps) {
  const context = React.useContext(SwitchContext);
  if (!context)
    throw new Error("Switch.Control must be used inside Switch.Root");

  const { isChecked, handleCheckedChange } = context;

  return (
    <SwitchPrimitive.Root
      checked={isChecked}
      onCheckedChange={(val, evt) => handleCheckedChange(val, evt)}
      className={cn(
        "relative inline-flex h-[22px] w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none",
        isChecked ? "bg-accent-green" : "bg-border",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full transition-all ring-0",
          isChecked
            ? "translate-x-[21px] bg-bg"
            : "translate-x-[3px] bg-[#6B7280]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export interface SwitchLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

function SwitchLabel({ className, children, ...props }: SwitchLabelProps) {
  const context = React.useContext(SwitchContext);
  if (!context) throw new Error("Switch.Label must be used inside Switch.Root");

  const { isChecked, handleCheckedChange } = context;

  return (
    <span
      onClick={() => handleCheckedChange(!isChecked, { reason: "none" } as any)}
      className={cn(
        "text-[12px] font-mono select-none uppercase transition-colors font-bold cursor-pointer",
        isChecked ? "text-accent-green" : "text-[#6B7280]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { SwitchRoot as Root, SwitchControl as Control, SwitchLabel as Label };
