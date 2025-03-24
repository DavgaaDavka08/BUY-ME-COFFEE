import DashboardProfile from "./_Components/DashboardProfile";
import DropDownMenu from "./_Components/DropDownMenu";

export default function Home() {
  return (
    <div className="flex">
      <DropDownMenu />
      <DashboardProfile />
    </div>
  );
}
