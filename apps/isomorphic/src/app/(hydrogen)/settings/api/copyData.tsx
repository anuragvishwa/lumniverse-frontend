'use client';

import React, { useState } from 'react';
import { Text } from '@/components/ui/text';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const CopyData = ({ value }: { value: string }) => {
  const [isCopied, setCopied] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard(value: string) {
    copyToClipboard(value);
    toast.success(<b>{`Copied '${value}' to clipboard`}</b>);
    setCopied(() => true);
    setTimeout(() => {
      setCopied(() => false);
    }, 300);
  }

  return (
    <Text as="span" className="flex items-center text-xs">
      {value}

      <div
        onClick={() => handleCopyToClipboard(`${value}`)}
        className="ml-2 mt-1 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="currentColor"
          className="bi bi-clipboard"
          viewBox="0 0 16 16"
        >
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
        </svg>
      </div>
    </Text>
  );
};

export default CopyData;
