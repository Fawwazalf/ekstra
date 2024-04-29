import Image from "next/image";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className="flex lg:h-screen justify-center items-center lg:gap-[84px] md:gap-[60px] gap-[30px] flex-col-reverse lg:flex-row mx-[20px] mt-[50px] lg:mt-[0px]">
      <div className="w-full md:w-[542px]">
        <p className="text-[#96BB7C] font-bold Stext-base md:mb-[30px]">
          SMK Negeri 7 Semarang
        </p>
        <p className="font-bold md:text-[58px] text-[34px] md:mb-[30px] md:leading-[80px]  ">
          Ikut Ekstrakurikuler Yuk!
        </p>
        <p className="text-[#737373] font-normal text-[20px] md:mb-[30px]">
          EksTra: Ekstrakurikuler Terpadu untuk Siswa
        </p>
        <div className="mt-[20px] md:mt-[0px]">
          <Link
            href="/masuk"
            className="text-[#FFFFFF] font-bold text-[14px] bg-[#96BB7C] rounded-[5px] px-[40px] py-[15px] "
          >
            Masuk
          </Link>
        </div>
      </div>
      <Image
        src="/img/Beranda.png"
        height="641"
        width="543"
        alt="Gambar Ekstra SMK Negeri 7 Semarang"
        className="w-full md:w-[543px]"
      />
    </div>
  );
};

export default Welcome;
