"use client";

import { WifiOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OfflinePage() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-sm flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-sand text-muted">
        <WifiOff aria-hidden="true" className="h-7 w-7" />
      </div>
      <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em]">{t("offlineTitle")}</h1>
      <p className="mt-2 text-sm text-muted">{t("offlineBody")}</p>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-[14px] bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-accent-dark"
        >
          {t("retry")}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-[14px] border border-line bg-card px-5 py-3 text-sm font-semibold"
        >
          {t("goBack")}
        </button>
      </div>
    </main>
  );
}
