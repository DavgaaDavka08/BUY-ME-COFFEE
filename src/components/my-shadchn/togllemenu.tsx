import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
export function ToggleGroupDemo() {
  return (
    <ToggleGroup
      type="multiple"
      className="flex flex-col w-[200px] justify-center items-start gap-5 "
    >
      <ToggleGroupItem value="bold">
        <p>home</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <p>Explore</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough">
        <p>View page</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="h">
        <p>Account settings</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
