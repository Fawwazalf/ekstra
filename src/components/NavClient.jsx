"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavClient = () => {
  const listNav = [
    ["Beranda", "/beranda"],
    ["Galeri", "/galeri"],
    ["Ekskul saya", "/ekskul-saya"],
  ];

  const pathName = usePathname();
  return (
    <>
      {listNav.map((list, index) => (
        <Link
          key={index}
          className={
            pathName == list[1]
              ? "underline underline-offset-8 decoration-[2px]"
              : `hover:underline underline-offset-8 decoration-[2px]`
          }
          href={list[1]}
        >
          {list[0]}
        </Link>
      ))}
    </>
  );
};

export default NavClient;
