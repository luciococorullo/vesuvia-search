"use client";

import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InstallLink } from "@/components/InstallApp";
import { Logo } from "@/app/components/Hero";

const CREJA_WORDMARK = "url(/brand/creja-wordmark.svg)";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mx-auto w-full max-w-[560px] px-5 pb-28 pt-12 md:pb-32">
      <div className="flex flex-col items-center gap-3 border-t border-line pt-7 text-center">
        <Logo tone="dark" />
        <p className="max-w-[34ch] text-[12.5px] leading-snug text-muted">{t("footerData")}</p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px]">
          <InstallLink />
          <a
            href="https://github.com/luciococorullo/vesuvia-search"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-sea hover:underline"
          >
            <Github aria-hidden="true" className="h-3.5 w-3.5" />
            {t("footerSource")}
          </a>
        </div>

        <a
          href="https://creja.it"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-2 text-[12.5px] text-muted transition hover:text-ink"
        >
          {t("footerMadeBy")}
          {/* Wordmark as a mask so it takes the text colour instead of its own navy. */}
          <span
            role="img"
            aria-label="Creja"
            className="inline-block h-[26px] w-[58px] translate-y-[3px] bg-current"
            style={{
              maskImage: CREJA_WORDMARK,
              WebkitMaskImage: CREJA_WORDMARK,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </a>
      </div>
    </footer>
  );
}
