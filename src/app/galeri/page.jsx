"use server";
// import Navbar from "../../components/Navbar";
import GaleriComponent from "../../components/GaleriComponent";
import prisma from "../../../lib/prisma";

import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../components/Navbar"), {
  ssr: false,
});

const GaleriPage = async () => {
  const posts = await prisma.post.findMany();
  return (
    <>
      <Navbar />
      <div className="flex justify-center gap-[5px] flex-wrap py-[120px]">
        <GaleriComponent posts={posts} />
      </div>
    </>
  );
};

export default GaleriPage;
