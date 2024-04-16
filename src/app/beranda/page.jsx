import EkskulCard from "../../components/EkskulCard";
import Navbar from "../../components/Navbar";
import prisma from "../../../lib/prisma";

const getEkstrasWithAnggotaCount = async () => {
  const ekstras = await prisma.ekstra.findMany({
    include: {
      users: true,
    },
  });
  return ekstras;
};

const Beranda = async () => {
  const ekstras = await getEkstrasWithAnggotaCount();
  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

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
            day={day[ekstra.hari]}
          />
        ))}
      </div>
    </>
  );
};

export default Beranda;
