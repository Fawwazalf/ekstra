import Image from "next/image";
import Link from "next/link";

const EkskulCard = (props) => {
  return (
    <div className="w-[348px] min-h-[650px] flex flex-col shadow-2xl rounded-[20px]">
      <Image
        src={props.image}
        height="300"
        width="348"
        alt="Gambar Ekstra SMK Negeri 7 Semarang"
        className="mb-[20px] rounded-t-[20px]  h-[300px] w-auto object-cover"
      />
      <div className="flex flex-col gap-[10px] px-[25px] pt-[25px] pb-[35px]">
        <div className="flex justify-between">
          <p className="text-[#96BB7C] font-bold text-sm">
            {props.categoryName}
          </p>
          <div className="bg-[#2D4059] p-[5px] flex gap-[5px] rounded-[20px]">
            <Image
              alt="icon"
              src="./img/iconprofil.svg"
              width="16"
              height="16"
              className="h-[16px]  "
            />
            <p className="text-[#FFFFFF] text-xs"> {props.anggota.length}</p>
          </div>
        </div>
        <p className="text-base font-bold ">{props.name}</p>
        <p className="text-xs text-[#737373]">{props.desc}</p>
        <p className="text-[#737373] text-sm font-bold">{props.location}</p>
        <p className="text-[#FFAB71] font-bold">{props.day}</p>
        <Link
          href={`/beranda/${props.id}`}
          className="text-[#96BB7C] font-bold text-[14px] border-[1px]  rounded-[37px] px-[20px] py-[10px] w-fit"
        >
          Lebih Lanjut
        </Link>
      </div>
    </div>
  );
};

export default EkskulCard;
