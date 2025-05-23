"use client"
import { useUser } from "@/app/_Context/getCreateProfile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ButtonDemo() {
  const { callData } = useUser();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (callData && callData[0]?.socialMediaURL) {
      navigator.clipboard.writeText(callData[0].socialMediaURL)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    }
  };

  return (
    <Button onClick={handleCopy}>
      {copied ? "Copied!" : callData && callData[0]?.socialMediaURL || "No URL available"}
    </Button>
  );
}
