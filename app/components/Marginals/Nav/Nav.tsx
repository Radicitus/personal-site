import Link from "next/link";
import ThemeSwitch from "@/app/components/Marginals/Nav/ThemeSwitch";
import { LinkType } from "@/types/linkType";

export default function Nav({ links }: { links: LinkType[] }) {
  return (
    <div className="w-full navbar px-8 pt-6 bg-base-100 sticky top-0 z-[1]">
      <div className="flex-1 px-2 mx-2">
        <Link href={"/"} className="text-4xl font-mohave font-bold">
          <span className="align-sub">CS</span>
        </Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <ThemeSwitch />
          {/* Navbar menu content here */}
          {links.map((link) => (
            <li key={link.title}>
              <Link href={link.path} target={"_" + link.target}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none lg:hidden">
        <ThemeSwitch />
        <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
    </div>
  );
}
