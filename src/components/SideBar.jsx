import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: ShoppingBag },
  { label: "Orders", icon: Package },
  { label: "Customers", icon: Users },
];

const SideBar = () => {
  return (
    <div
      className="h-[calc(100vh-130px)] bg-white md:p-4 p-2 rounded-xl mt-4 flex flex-col  transition-all
        w-14 md:w-56"
    >
      <ul className="space-y-10 mt-6 flex flex-col items-center md:items-start">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <button className="flex items-center md:space-x-3 text-gray-700 hover:text-teal-800 w-full">
              <item.icon size={22} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
            <span className=" md:hidden absolute left-12 top-1/2 transform -translate-y-1/2 bg-teal-700 text-white text-sm py-1 px-2 rounded-e rounded-ss opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="relative group">
          <button className="flex items-center space-x-3 text-gray-700 hover:text-teal-800 w-full">
            <Settings size={20} />
            <span className="hidden md:inline">Settings</span>
          </button>
          <span className=" md:hidden absolute left-12 top-1/2 transform -translate-y-1/2 bg-teal-700 text-white text-sm py-1 px-2 rounded-e rounded-ss opacity-0 group-hover:opacity-100 transition-opacity">
            Settings
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
