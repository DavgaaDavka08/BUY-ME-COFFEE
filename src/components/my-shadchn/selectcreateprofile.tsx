"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="mx">Mexico</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="it">Italy</SelectItem>
          <SelectItem value="es">Spain</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="cn">China</SelectItem>
          <SelectItem value="jp">Japan</SelectItem>
          <SelectItem value="in">India</SelectItem>
          <SelectItem value="sg">Singapore</SelectItem>
          <SelectItem value="kr">South Korea</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Oceania</SelectLabel>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="nz">New Zealand</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="br">Brazil</SelectItem>
          <SelectItem value="ar">Argentina</SelectItem>
          <SelectItem value="cl">Chile</SelectItem>
          <SelectItem value="co">Colombia</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Africa</SelectLabel>
          <SelectItem value="za">South Africa</SelectItem>
          <SelectItem value="ng">Nigeria</SelectItem>
          <SelectItem value="eg">Egypt</SelectItem>
          <SelectItem value="ke">Kenya</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
