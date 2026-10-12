"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mx-auto flex w-full max-w-[560px] flex-col items-center gap-4 px-5 pb-28 pt-12 text-center text-xs text-muted md:pb-32">
      <a
        href="https://creja.it"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-full border border-line bg-card py-2 pl-2 pr-4 shadow-warm-sm transition hover:-translate-y-0.5 hover:border-sun"
      >
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sea via-sea2 to-sun font-serif text-base font-bold text-white"
        >
          C
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
            {t("footerMadeBy")}
          </span>
          <span className="font-serif text-lg font-semibold text-ink">Creja</span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </a>
      <p>{t("footerData")}</p>
      <a
        href="https://github.com/luciococorullo/vesuvia-search"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-semibold text-sea hover:underline"
      >
        <Github aria-hidden="true" className="h-3.5 w-3.5" />
        {t("footerSource")}
      </a>
    </footer>
  );
}
