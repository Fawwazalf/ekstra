import EkskulCard from "../../components/EkskulCard";
import Navbar from "../../components/Navbar";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Link from "next/link";

const getEkstrasWithAnggotaCount = async () => {
  const ekstras = await prisma.ekstra.findMany({
    include: {
      users: true,
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  return ekstras;
};

const Beranda = async () => {
  const session = await getServerSession(authOptions);
  const ekstras = await getEkstrasWithAnggotaCount();
  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const userSession = session
    ? await prisma.user.findUnique({
        where: {
          id: session.id,
        },
      })
    : null;
  return (
    <>
      <Navbar />
      {userSession == null
        ? " "
        : userSession.nis === "admin" && (
            <div className="flex justify-center gap-[80px] flex-wrap pt-[120px] ">
              <Link
                href="/dashboard"
                className="font-bold text-[14px] rounded-[5px] px-[40px] py-[15px] text-[#FFFFFF] bg-[#96BB7C]"
              >
                DASHBOARD
              </Link>
            </div>
          )}
      <div className="flex justify-center gap-[80px] flex-wrap py-[120px]">
        {ekstras.map((ekstra) => (
          <EkskulCard
            key={ekstra.id}
            id={ekstra.id}
            name={ekstra.name}
            desc={ekstra.desc}
            categoryName={ekstra.category.name}
            location={ekstra.location}
            pembimbing={ekstra.pembimbing}
            image={ekstra.image}
            anggota={ekstra.users}
            day={day[ekstra.hari - 1]}
          />
        ))}
      </div>
    </>
  );
};

export default Beranda;
