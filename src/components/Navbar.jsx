"use client";
import Image from "next/image";
import Link from "next/link";
import NavClient from "./NavClient";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between py-[30px] px-[100px] font-bold fixed w-[100%] backdrop-filter backdrop-blur-sm">
      <Link href="/" className="font-bold text-2xl ">
        EksTra
      </Link>
      <div className="flex gap-[21px] text-sm">
        <NavClient />
      </div>
      <Link href="/profil">
        {pathname === "/profil" ? (
          <Image
            src="/img/ProfileActive.svg"
            height="30"
            width="30"
            alt="Tombol Profile"
          />
        ) : (
          <Image
            src="/img/Profile.svg"
            height="30"
            width="30"
            alt="Tombol Profile"
          />
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
