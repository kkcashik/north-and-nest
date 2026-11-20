import type { Metadata } from "next";
import { BuildClient } from "./BuildClient";

export const metadata: Metadata = { title: "Build your own set" };

export default function BuildPage() {
  return (
    <div className="section container-page">
      <h1 className="text-4xl">Build your own set</h1>
      <p className="mt-2 max-w-2xl text-charcoal/80">Pick a tree, a container and a hanger. Put them together and take 10% off the three parts.</p>
      <BuildClient />
    </div>
  );
}
