import Image from "next/image";

const FunFact = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col mb-[50px]">
        <p className=" font-bold text-[40px] text-center mb-[10px]">
          Fun Information
        </p>
        <p className="text-[#737373] font-normal text-[14px] w-[463px] text-center">
          SMK Negeri 7 Semarang memiliki beberapa ekstrakulikuler diantaranya :
          ambalan, paskibra, karawitan, stemba english club, futsal, basket,
          voli, dll. Sesuai motto tiada hari tanpa prestasi setiap
          ekstrakulikuler tersebut kerap membawa prestasi bagi sekolah.
        </p>
      </div>
      <div className="flex gap-[50px]  ">
        <div className="flex flex-col w-[271px] h-[300px] shadow-lg px-[40px] py-[35px] items-center">
          <Image
            src="/img/Fun.svg"
            height="48"
            width="48"
            alt="Gambar Ekstra SMK Negeri 7 Semarang"
            className="mb-[20px]"
          />
          <p className="font-bold text-[16px] mb-[20px]">21 Ekstrakurikuler</p>
          <div className="w-[50px] h-[2px] bg-[#E74040] mb-[20px]"></div>
          <p className="w-[136px] text-center text-[14px] text-[#737373]">
            Terdapat 21 Ekstrakurikuler di SMKN 7 Semarang
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
          <p className="font-bold text-[16px] mb-[20px]">827 Siswa</p>
          <div className="w-[50px] h-[2px] bg-[#E74040] mb-[20px]"></div>
          <p className="w-[136px] text-center text-[14px] text-[#737373]">
            Sebanyak 827 Siswa yang mengikuti Ekstrakurkuler
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunFact;
