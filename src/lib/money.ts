/** Prices are stored in dollars in the data file; maths is done in whole cents to avoid float errors. */
export const toCents = (dollars: number) => Math.round(dollars * 100);
export const formatCents = (cents: number) =>
  `$${(cents / 100).toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const formatPrice = (dollars: number) => formatCents(toCents(dollars));
/** Bundle-builder discount: exactly 10% off, rounded to the nearest cent. */
export const BUILDER_DISCOUNT_RATE = 0.1;
export const applyBuilderDiscount = (cents: number) => Math.round(cents * (1 - BUILDER_DISCOUNT_RATE));
