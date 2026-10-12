import { Suspense } from "react";
import { AppShell } from "./components/AppShell";

export default function Home() {
  return (
    <Suspense fallback={<div className="hero h-[280px]" aria-hidden="true" />}>
      <AppShell />
    </Suspense>
  );
}
