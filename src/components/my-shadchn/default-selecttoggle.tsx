"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coffee } from "lucide-react";

export function ToggleGroupDemoDonation() {
  return (
    <ToggleGroup type="single" defaultValue="5" className="flex gap-2.5 ">
      <ToggleGroupItem
        value="1"
        aria-label="$1"
        className="flex items-center gap-1 px-4 py-2 rounded-md data-[state=on]:ring-2 data-[state=on]:ring-primary"
      >
        <Coffee className="h-4 w-4" />
        <span>$1</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="2"
        aria-label="$2"
        className="flex items-center gap-1 px-4 py-2 rounded-md data-[state=on]:ring-2 data-[state=on]:ring-primary"
      >
        <Coffee className="h-4 w-4" />
        <span>$2</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="5"
        aria-label="$5"
        className="flex items-center gap-1 px-4 py-2 rounded-md data-[state=on]:ring-2 data-[state=on]:ring-primary"
      >
        <Coffee className="h-4 w-4" />
        <span>$5</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="10"
        aria-label="$10"
        className="flex items-center gap-1 px-4 py-2 rounded-md data-[state=on]:ring-2 data-[state=on]:ring-primary"
      >
        <Coffee className="h-4 w-4" />
        <span>$10</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
