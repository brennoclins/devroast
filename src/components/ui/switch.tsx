"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/utils/cn";

// Extraímos o tipo diretamente da definição do componente
type CheckedChangeDetails = Parameters<NonNullable<React.ComponentProps<typeof SwitchPrimitive.Root>['onCheckedChange']>>[1];

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
}

export function Switch({
  className,
  label,
  onCheckedChange,
  checked: controlledChecked,
  defaultChecked,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isChecked = controlledChecked ?? internalChecked;

  // Agora a função aceita o booleano e o objeto de detalhes de evento
  const handleCheckedChange = (val: boolean, eventDetails: CheckedChangeDetails) => {
    if (controlledChecked === undefined) {
      setInternalChecked(val);
    }
    // Repassamos ambos os argumentos, caso alguém utilize o componente controlado
    onCheckedChange?.(val, eventDetails);
  };

  return (
    <div className="flex items-center gap-3">
      <SwitchPrimitive.Root
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        className={cn(
          "relative inline-flex h-[22px] w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none",
          isChecked ? "bg-[#10B981]" : "bg-[#2A2A2A]",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full transition-all ring-0",
            isChecked ? "translate-x-[21px] bg-[#0A0A0A]" : "translate-x-[3px] bg-[#6B7280]"
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <span
          onClick={() => handleCheckedChange(!isChecked, { reason: 'none' } as CheckedChangeDetails)}
          className={cn(
            "text-[12px] font-mono select-none uppercase transition-colors font-bold cursor-pointer",
            isChecked ? "text-[#10B981]" : "text-[#6B7280]"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}