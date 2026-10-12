"use client";

import Image from "next/image";
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
        className="group inline-flex items-center gap-3 rounded-full border border-line bg-card py-3 pl-5 pr-4 shadow-warm-sm transition hover:-translate-y-0.5 hover:border-sun"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
          {t("footerMadeBy")}
        </span>
        <Image
          src="/brand/creja-wordmark.svg"
          alt="Creja"
          unoptimized
          width={66}
          height={29}
          className="h-7 w-auto transition group-hover:opacity-80"
        />
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
