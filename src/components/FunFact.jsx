import Image from "next/image";
import prisma from "../../lib/prisma";

const FunFact = async () => {
  const ekstras = await prisma.ekstra.findMany({});
  const anggotas = await prisma.anggota.findMany({});
  return (
    <div className="flex flex-col lg:h-screen justify-center items-center mx-[20px] mt-[100px] lg:mt-[0px]">
      <div className="flex flex-col mb-[50px]">
        <p className=" font-bold text-[40px] text-center mb-[10px]">
          Fun Information
        </p>
        <p className="text-[#737373] font-normal text-[14px] md:w-[463px] w-full text-center">
          SMK Negeri 7 Semarang memiliki beberapa ekstrakulikuler diantaranya :
          ambalan, paskibra, karawitan, stemba english club, futsal, basket,
          voli, dll. Sesuai motto tiada hari tanpa prestasi setiap
          ekstrakulikuler tersebut kerap membawa prestasi bagi sekolah.
        </p>
      </div>
      <div className="flex gap-[50px] flex-col md:flex-row">
        <div className="flex flex-col w-[271px] h-[300px] shadow-lg px-[40px] py-[35px] items-center">
          <Image
            src="/img/Fun.svg"
            height="48"
            width="48"
            alt="Gambar Ekstra SMK Negeri 7 Semarang"
            className="mb-[20px]"
          />
          <p className="font-bold text-[16px] mb-[20px]">
            {ekstras.length} Ekstrakurikuler
          </p>
          <div className="w-[50px] h-[2px] bg-[#E74040] mb-[20px]"></div>
          <p className="w-[136px] text-center text-[14px] text-[#737373]">
            Terdapat {ekstras.length} Ekstrakurikuler di SMKN 7 Semarang
          </p>
        </div>
        <div className="flex flex-col w-[271px] h-[300px] shadow-lg px-[40px] py-[35px] items-center">
          <Image
            src="/img/Fun.svg"
            height="48"
            width="48"
            alt="Gambar Ekstra SMK Negeri 7 Semarang"
            className="mb-[20px]"
          />
          <p className="font-bold text-[16px] mb-[20px]">
            {anggotas.length} Siswa
          </p>
          <div className="w-[50px] h-[2px] bg-[#E74040] mb-[20px]"></div>
          <p className="w-[136px] text-center text-[14px] text-[#737373]">
            Sebanyak {anggotas.length} Siswa yang mengikuti Ekstrakurkuler
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunFact;
