import type { Metadata } from "next";
import { trees, LIVE_PLANT_NOTE } from "@/data/products";

export const metadata: Metadata = { title: "Winter plant care in Canada" };

const tips = [
  { t: "Water less in winter", d: "Plants grow slowly in short days. Let the top few centimetres of soil dry out before watering, and never leave water sitting in the pot." },
  { t: "Find the light", d: "Put your tree in a south or west window if you can, and rotate it a quarter turn every week so it grows evenly." },
  { t: "Fight dry heated air", d: "Mist the leaves, or set the pot on a pebble tray with a little water underneath. Group plants together to share humidity." },
  { t: "Avoid drafts and radiators", d: "Cold drafts from doors and windows, and hot air from vents or radiators, both stress plants. Keep a hand's width of space." },
  { t: "How heat-pack shipping works", d: "Live plants travel in an insulated box with a heat pack, shipped expedited within Ontario. Unpack your plant straight away and let it settle somewhere bright and draft-free." },
];

export default function CarePage() {
  return (
    <div className="section container-page">
      <h1 className="text-4xl">Winter plant care in Canada</h1>
      <p className="mt-3 max-w-2xl text-charcoal/80">Five habits that keep indoor trees healthy through a Canadian winter.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {tips.map((t) => (
          <section key={t.t} className="rounded-2xl bg-sage p-6">
            <h2 className="font-serif text-xl">{t.t}</h2>
            <p className="mt-2 text-sm text-charcoal/85">{t.d}</p>
          </section>
        ))}
      </div>
      <h2 className="mt-12 text-2xl">Quick care by tree</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-soft">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-forest text-cream">
            <tr><th className="p-3">Tree</th><th className="p-3">Light</th><th className="p-3">Difficulty</th><th className="p-3">Winter note</th></tr>
          </thead>
          <tbody>
            {trees.map((t) => (
              <tr key={t.slug} className="border-t border-jute/20 align-top">
                <th scope="row" className="p-3 font-medium">{t.name}</th>
                <td className="p-3">{t.lightLabel}</td>
                <td className="p-3">{t.difficulty}</td>
                <td className="p-3">{t.winterNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-charcoal/70">{LIVE_PLANT_NOTE}</p>
    </div>
  );
}
