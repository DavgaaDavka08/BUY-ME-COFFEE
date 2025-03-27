import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

export function DialogDemodonation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Suport</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan QR code</DialogTitle>
          <DialogDescription>
            Scan the QR code to complete your donation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Image alt="" src="/frame.png" width={246} height={246} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
