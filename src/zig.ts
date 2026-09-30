export const ZIG_DENOM = "azig";
export const ZIG_DECIMALS = 18;
export const ZIG_SCALE = 10n ** BigInt(ZIG_DECIMALS);

// Parses a human decimal string ("50000", "0.5") into raw azig without going through float.
export function parseZigToRaw(input: string): bigint {
  const match = input.trim().match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) {
    throw new Error(`Invalid ZIG amount "${input}"`);
  }
  const fraction = (match[2] ?? "").slice(0, ZIG_DECIMALS).padEnd(ZIG_DECIMALS, "0");
  return BigInt(match[1]) * ZIG_SCALE + BigInt(fraction || "0");
}

export function formatZigFromAzig(amountAzig: bigint): string {
  const whole = amountAzig / ZIG_SCALE;
  const fraction = amountAzig % ZIG_SCALE;
  if (fraction === 0n) {
    return whole.toString();
  }
  return `${whole}.${fraction.toString().padStart(ZIG_DECIMALS, "0").replace(/0+$/, "")}`;
}
