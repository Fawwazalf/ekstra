import EkskulCard from "../../components/EkskulCard";
import Navbar from "../../components/Navbar";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const getEkstrasWithAnggotaCount = async () => {
  const session = await getServerSession(authOptions);
  const anggotas = await prisma.anggota.findMany({
    where: {
      userId: session.id,
    },

    include: {
      ekstra: {
        include: {
          users: true,
        },
      },
    },
  });

  const ekstras = anggotas.map((anggota) => anggota.ekstra);

  return ekstras;
};

const EkskulSaya = async () => {
  const ekstras = await getEkstrasWithAnggotaCount();

  return (
    <>
      <Navbar />
      <div className="flex justify-center gap-[80px] flex-wrap py-[120px]">
        {ekstras.map((ekstra) => (
          <EkskulCard
            key={ekstra.id}
            id={ekstra.id}
            name={ekstra.name}
            desc={ekstra.desc}
            categoryName={ekstra.categoryName}
            location={ekstra.location}
            pembimbing={ekstra.pembimbing}
            image={ekstra.image}
            anggota={ekstra.users}
          />
        ))}
      </div>
    </>
  );
};

export default EkskulSaya;
