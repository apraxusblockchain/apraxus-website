"use client";

import { useState } from "react";

type CopyAddressButtonProps = {
  address: string;
};

export default function CopyAddressButton({
  address,
}: CopyAddressButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
    >
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
