import Image from "next/image";

import ButtonMasuk from "./ButtonMasuk";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import GaleriComponent from "../components/GaleriComponent";

const Detail = async (props) => {
  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const session = await getServerSession(authOptions);
  let userId = 999999;
  if (session && session.id) {
    userId = session.id;
  }
  const sudahMasuk = await prisma.anggota.findMany({
    where: {
      ekstraId: props.id,
      userId: userId,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      ekstraId: props.id,
    },
  });
  const getUser = async (id) => {
    const res = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.nis;
  };
  const nis = await getUser(userId);
  const ekstras = await prisma.ekstra.findMany({});
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-[50px] mx-[120px]">
        <img
          src={props.image}
          alt={props.name}
          priority
          className="h-[240px] min-w-[300px] md:max-w-[500px] lg:max-w-[696px]  md:h-[400px] md:w-[500px] lg:h-[600px] lg:w-[696px]  object-cover"
        />
        <div className="flex flex-col gap-[20px]">
          <p className="font-bold text-2xl ">{props.name}</p>
          <div>
            <p>Pembimbing: {props.pembimbing}</p>
            <p>Anggota: {props.anggota} Siswa</p>
            <p>Tempat: {props.location}</p>
            <p>Hari: {day[props.day]}</p>
          </div>
          <div className="flex flex-row gap-[20px]">
            <button className="text-[#FFFFFF] font-bold text-[14px] bg-[#96BB7C] rounded-[5px] px-[40px] py-[15px] ">
              Kontak
            </button>

            <ButtonMasuk
              ekstraId={props.id}
              userId={userId}
              sudahMasuk={sudahMasuk}
              nis={nis}
              ekstras={ekstras}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-[95px]">
        <p className="font-bold text-[22px] ">Galeri {props.name}</p>
        <div className="flex flex-row flex-wrap justify-center gap-[5px] mt-[60px]">
          <GaleriComponent posts={posts} />
        </div>
      </div>
    </>
  );
};

export default Detail;
