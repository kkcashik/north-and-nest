"use client";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  label = "Quantity",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-jute/60 bg-white" role="group" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))}
        className="h-10 w-10 text-lg text-forest hover:bg-sage rounded-l-full">−</button>
      <span className="w-8 text-center text-sm font-medium" aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(99, value + 1))}
        className="h-10 w-10 text-lg text-forest hover:bg-sage rounded-r-full">+</button>
    </div>
  );
}
