import Image from "next/image";

import ButtonMasuk from "./ButtonMasuk";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import Galeri from "../components/Galeri";

const Detail = async (props) => {
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

  return (
    <>
      <div className="flex flex-row items-center gap-[50px] mx-[120px]">
        <Image
          src={props.image}
          width={696}
          height={600}
          alt={props.name}
          priority
        />
        <div className="flex flex-col gap-[20px]">
          <p className="font-bold text-2xl ">{props.name}</p>
          <div>
            <p>Pembimbing: {props.pembimbing}</p>
            <p>Anggota: {props.anggota} Siswa</p>
            <p>Tempat: {props.location}</p>
            <p>Hari: Setiap hari</p>
          </div>
          <div className="flex flex-row gap-[20px]">
            <button className="text-[#FFFFFF] font-bold text-[14px] bg-[#96BB7C] rounded-[5px] px-[40px] py-[15px] ">
              Kontak
            </button>

            <ButtonMasuk
              ekstraId={props.id}
              userId={userId}
              sudahMasuk={sudahMasuk}
              nis={parseInt(nis)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-[95px]">
        <p className="font-bold text-[22px] ">Galeri {props.name}</p>
        <div className="flex flex-row flex-wrap justify-center gap-[5px] mt-[60px]">
          <Galeri posts={posts} />
        </div>
      </div>
    </>
  );
};

export default Detail;
