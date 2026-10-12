"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { t } = useLanguage();
  return (
    <span
      className={`flex items-center gap-2 text-[15px] font-bold tracking-[-0.01em] ${tone === "light" ? "text-[#FFF8EE]" : "text-ink"}`}
    >
      <Image
        src="/brand/vesuvia-mark.png"
        alt=""
        width={35}
        height={32}
        priority
      />
      {t("appName")}
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();
  return (
    <header className="hero px-[22px] pb-[84px] pt-[max(env(safe-area-inset-top),20px)] text-[#FFF8EE] md:pb-[96px]">
      <div className="mx-auto max-w-[560px]">
        <div className="flex items-center justify-between pt-4">
          <Logo />
          <LanguageSelector tone="light" />
        </div>
        <h1 className="mt-6 font-serif text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] md:mt-10 md:text-[44px]">
          {t("heroTitleA")}
          <br />
          <i className="text-[#FFD98A]">{t("heroTitleB")}</i>
        </h1>
        <p className="mt-3 max-w-[30ch] text-[13.5px] md:max-w-[46ch] font-medium text-white/80 md:text-[15px]">
          {t("heroSubtitle")}
        </p>
      </div>
    </header>
  );
}
