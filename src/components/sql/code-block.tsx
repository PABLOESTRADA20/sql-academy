"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "sql",
  title,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-border/50 bg-[#0B1121] dark:bg-[#0B1121] bg-[#F8FAFC] dark:bg-[#0B1121]">
      <div className="flex items-center justify-between border-b border-border/10 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="text-xs text-gray-400">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{language}</span>
          <button
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 opacity-0 transition-opacity hover:bg-white/5 hover:text-gray-300 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="font-mono leading-relaxed text-gray-200 dark:text-gray-200 text-gray-800 dark:text-gray-200">
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="table-row">
                    <span className="table-cell w-8 select-none text-right text-gray-600 dark:text-gray-600 text-gray-400 dark:text-gray-600 pr-4 text-xs">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line || " "}</span>
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
