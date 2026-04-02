"use client";

import NumberFlow from "@number-flow/react";

export interface AnimatedNumberProps {
  value: number;
  decimals?: number;
}

export function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps) {
  return (
    <NumberFlow
      value={value}
      format={{
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }}
      className="text-lg font-bold font-mono text-accent-green tabular-nums"
    />
  );
}
