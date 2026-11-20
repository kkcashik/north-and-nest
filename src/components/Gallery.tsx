"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : [undefined];
  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-sage shadow-soft">
        <ProductImage src={list[i]} name={name} priority className="aspect-[4/5] w-full" />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-3">
          {list.map((src, idx) => (
            <button key={idx} type="button" aria-label={`Show photo ${idx + 1}`} aria-pressed={i === idx} onClick={() => setI(idx)}
              className={`h-20 w-16 overflow-hidden rounded-xl border-2 ${i === idx ? "border-forest" : "border-transparent"}`}>
              <ProductImage src={src} name={name} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
