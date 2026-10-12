/**
 * @fileoverview "Add to Home Screen" flow.
 *
 * - Chromium (Android, desktop): the native install prompt captured by pwaManager.
 * - iOS (any browser): there is no install API, so a sheet explains the
 *   Share → "Add to Home Screen" steps.
 * - Other Android browsers: a sheet with the browser-menu steps.
 * Nothing is shown when the app already runs standalone.
 *
 * `InstallBanner` sits on the home page and can be snoozed; `InstallLink`
 * lives in the footer and is always available.
 */

"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Download, EllipsisVertical, Share, SquarePlus, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";
import { pwaManager } from "@/lib/pwa";
import { getInstallDismissedAt, setInstallDismissedAt, subscribe } from "@/lib/storage";
import { cn } from "@/lib/utils";

type InstallMode = "native" | "ios" | "android";

/** The banner comes back this long after "Not now". */
const SNOOZE_MS = 21 * 24 * 60 * 60 * 1000;

function isIOS(ua: string): boolean {
  // iPadOS reports itself as a Mac; touch support gives it away.
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

function detectMode(): InstallMode | null {
  if (pwaManager.isStandalone()) return null;
  if (pwaManager.getIsInstallable()) return "native";
  const ua = navigator.userAgent;
  if (isIOS(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return null;
}

/** Safari proper (not Chrome/Firefox/Edge or an in-app browser on iOS). */
function isIOSSafari(): boolean {
  const ua = navigator.userAgent;
  return isIOS(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Instagram|Line\//.test(ua);
}

function useInstall() {
  const [mode, setMode] = useState<InstallMode | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const update = () => setMode(detectMode());
    update();
    const off = pwaManager.onInstallPromptChange(update);
    window.addEventListener("appinstalled", update);
    return () => {
      off();
      window.removeEventListener("appinstalled", update);
    };
  }, []);

  const start = useCallback(async () => {
    if (mode === "native") {
      await pwaManager.showInstallPrompt();
      setMode(detectMode());
    } else if (mode) {
      setSheetOpen(true);
    }
  }, [mode]);

  const sheet =
    mode === "ios" || mode === "android" ? (
      <InstallSheet open={sheetOpen} mode={mode} onClose={() => setSheetOpen(false)} />
    ) : null;

  return { mode, start, sheet };
}

const STEPS: Record<"ios" | "android", { icon: React.ReactNode; key: TranslationKey }[]> = {
  ios: [
    { icon: <Share className="h-[18px] w-[18px]" />, key: "installIosStep1" },
    { icon: <SquarePlus className="h-[18px] w-[18px]" />, key: "installIosStep2" },
    { icon: <span className="text-[13px] font-bold">OK</span>, key: "installIosStep3" },
  ],
  android: [
    { icon: <EllipsisVertical className="h-[18px] w-[18px]" />, key: "installAndroidStep1" },
    { icon: <Download className="h-[18px] w-[18px]" />, key: "installAndroidStep2" },
    { icon: <span className="text-[13px] font-bold">OK</span>, key: "installAndroidStep3" },
  ],
};

function InstallSheet({ open, mode, onClose }: { open: boolean; mode: "ios" | "android"; onClose: () => void }) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const uid = useId();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  const showSafariHint = mode === "ios" && !isIOSSafari();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-0 mt-auto max-h-none w-full max-w-none overflow-hidden rounded-t-[24px] bg-bg p-0 text-ink shadow-warm",
        "open:animate-sheet-in",
        "md:m-auto md:max-w-[440px] md:rounded-[24px]",
      )}
    >
      <div className="relative px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-5">
        <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-line md:hidden" />
        <div className="flex items-start gap-3">
          <Image
            src="/icons/apple-touch-icon.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-[12px] shadow-warm-sm"
          />
          <div className="min-w-0 flex-1">
            <h2 id={`${uid}-title`} className="text-[19px] font-semibold leading-tight tracking-[-0.01em]">
              {t("installTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t("installBody")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-ink-soft hover:bg-sand-2"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{t("close")}</span>
          </button>
        </div>

        <ol className="mt-5 overflow-hidden rounded-2xl border border-line bg-card">
          {STEPS[mode].map((step, i) => (
            <li key={step.key} className="flex items-center gap-3 border-t border-line px-3.5 py-3 first:border-t-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-sea" aria-hidden="true">
                {step.icon}
              </span>
              <span className="text-sm font-medium">
                <span className="sr-only">{i + 1}. </span>
                {t(step.key)}
              </span>
            </li>
          ))}
        </ol>

        {showSafariHint && <p className="mt-3 text-center text-[12.5px] text-muted">{t("installIosHint")}</p>}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-[14px] bg-accent py-3.5 text-[15px] font-bold text-white transition hover:bg-accent-dark active:scale-[0.99]"
        >
          OK
        </button>
      </div>
    </dialog>
  );
}

/** Snapshot for useSyncExternalStore: a boolean, so it stays stable. */
function getSnoozed(): boolean {
  const at = getInstallDismissedAt();
  return at !== null && Date.now() - at < SNOOZE_MS;
}
const getSnoozedServer = () => true;

/** Home-page card inviting to install; snoozed for a while after "Not now". */
export function InstallBanner({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { mode, start, sheet } = useInstall();
  const snoozed = useSyncExternalStore(subscribe, getSnoozed, getSnoozedServer);
  if (!mode || snoozed) return sheet;

  return (
    <>
      <section
        aria-label={t("installTitle")}
        className={cn("mx-4 mt-5 flex items-center gap-3 rounded-2xl border border-line bg-card p-3.5 shadow-warm-sm md:mx-5", className)}
      >
        <Image
          src="/icons/apple-touch-icon.png"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-[11px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-semibold leading-tight">{t("installTitle")}</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{t("installBody")}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <button
            type="button"
            onClick={() => void start()}
            className="rounded-full bg-accent px-4 py-2 text-[13px] font-bold text-white transition hover:bg-accent-dark"
          >
            {t("installCta")}
          </button>
          <button
            type="button"
            onClick={() => setInstallDismissedAt(Date.now())}
            className="px-1 text-[12px] font-semibold text-muted hover:underline"
          >
            {t("installLater")}
          </button>
        </div>
      </section>
      {sheet}
    </>
  );
}

/** Footer link, always available while the app is not installed. */
export function InstallLink() {
  const { t } = useLanguage();
  const { mode, start, sheet } = useInstall();
  if (!mode) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => void start()}
        className="inline-flex items-center gap-1 font-semibold text-sea hover:underline"
      >
        <SquarePlus aria-hidden="true" className="h-3.5 w-3.5" />
        {t("installApp")}
      </button>
      {sheet}
    </>
  );
}
