import Image from "next/image";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className="flex h-screen justify-center items-center gap-[84px]  ">
      <div className="w-[573px] h-min">
        <p className="text-[#96BB7C] font-bold text-base mb-[30px]">
          SMK Negeri 7 Semarang
        </p>
        <p className="font-bold text-[58px] mb-[30px] w-[542px] leading-[80px]">
          Ikut Ekstrakurikuler Yuk!
        </p>
        <p className="text-[#737373] font-normal text-[20px] mb-[30px]">
          EksTra: Ekstrakurikuler Terpadu untuk Siswa
        </p>
        <Link
          href="/masuk"
          className="text-[#FFFFFF] font-bold text-[14px] bg-[#96BB7C] rounded-[5px] px-[40px] py-[15px]"
        >
          Masuk
        </Link>
      </div>
      <div className="h-min">
        <Image
          src="/img/Beranda.png"
          height="641"
          width="543"
          alt="Gambar Ekstra SMK Negeri 7 Semarang"
        />
      </div>
    </div>
  );
};

export default Welcome;
