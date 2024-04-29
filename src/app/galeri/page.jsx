import Navbar from "../../components/Navbar";
import Galeri from "../../components/Galeri";
import prisma from "../../../lib/prisma";

const GaleriPage = async () => {
  const posts = await prisma.post.findMany({});
  return (
    <>
      <Navbar />
      <div className="flex justify-center gap-[5px] flex-wrap py-[120px]">
        <Galeri posts={posts} />
      </div>
    </>
  );
};

export default GaleriPage;
