"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

/** Catches render errors in the subtree and shows a minimal, bilingual recovery screen. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div role="alert" className="mx-auto max-w-sm px-6 py-24 text-center">
        <p className="text-2xl font-semibold">Qualcosa è andato storto</p>
        <p className="mt-2 text-sm text-muted">Something went wrong. Ricarica la pagina.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white"
        >
          Ricarica · Reload
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
