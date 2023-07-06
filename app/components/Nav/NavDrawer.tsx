import NavSidebar from "@/app/components/Nav/NavSidebar";
import { navItemType } from "@/types/navItemType";
import Nav from "@/app/components/Nav/Nav";

export default function NavDrawer({ children }: { children: React.ReactNode }) {
  const navItems: navItemType[] = [
    { title: "Home", path: "/" },
    { title: "Experience", path: "/experience" },
    { title: "Projects", path: "/projects" },
    { title: "About", path: "/about" },
  ];

  return (
    <div className="drawer drawer-end">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Nav navItems={navItems} />

        {/* Page content here */}
        {children}
      </div>
      <NavSidebar navItems={navItems} />
    </div>
  );
}
