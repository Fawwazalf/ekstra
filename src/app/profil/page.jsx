import LogOut from "../../components/LogOut";
import Navbar from "../../components/Navbar";
import prisma from "../../../lib/prisma";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";

const getUser = async (id) => {
  const res = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res;
};

const Profil = async () => {
  const session = await getServerSession(authOptions);
  const user = await getUser(session.id);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col py-[120px] h-screen items-center justify-center ">
        <div className="flex flex-row text-sm justify-center gap-[50px] h-fit">
          <div className="flex flex-col gap-[10px] h-min">
            <p>Nama Lengkap</p>
            <p>Kelamin</p>
            <p>Kelas</p>
            <p>Program Keahlian</p>
            <p>NIS</p>
            <p>NISN</p>
          </div>
          <div className="flex flex-col gap-[10px] h-min font-bold">
            <p>{user.fullname}</p>
            <p>{user.gender}</p>
            <p>{user.kelas}</p>
            <p>{user.jurusan}</p>
            <p>{user.nis}</p>
            <p>{user.nisn}</p>
          </div>
        </div>
        <LogOut />
      </div>
    </>
  );
};

export default Profil;
