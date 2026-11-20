export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-jute-light/90 px-2.5 py-0.5 text-xs font-medium text-forest">
      {children}
    </span>
  );
}
