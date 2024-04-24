import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import CreateCategory from "../../components/CreateCategory";
import EditCategory from "../../components/EditCategory";
import DeleteCategory from "../../components/DeleteCategory";
import CreateEkstra from "../../components/CreateEkstra";
import EditEkstra from "../../components/EditEkstra";
import DeleteEkstra from "../../components/DeleteEkstra";
import CreateUser from "../../components/CreateUser";
import EditUser from "../../components/EditUser";
import DeleteUser from "../../components/DeleteUser";

const page = async (props) => {
  const session = await getServerSession(authOptions);

  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const categories = await prisma.category.findMany({
    include: {
      ekstras: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const ekstras = await prisma.ekstra.findMany({
    include: {
      users: true,
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const users = await prisma.user.findMany({
    orderBy: {
      nis: "asc",
    },
  });

  const userSession = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (userSession.nis != "admin") {
    redirect("/beranda");
  }

  return (
    <div className="container mt-10 mx-[30px] ">
      <h1 className="text-2xl font-bold mb-5">Dashboard Admin</h1>
      <div className="flex gap-[20px]">
        <CreateCategory />
        <CreateEkstra categories={categories} />
        <CreateUser />
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Kategori</h2>
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Ekstra</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.ekstras.map((ekstra) => ekstra.name).join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <EditCategory category={category} />
                  <DeleteCategory
                    id={category.id}
                    ekstraLength={category.ekstras.length}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Ekstra</h2>
        <table className=" border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
              <th className="border border-gray-300 px-4 py-2">Kategori</th>
              <th className="border border-gray-300 px-4 py-2">Lokasi</th>
              <th className="border border-gray-300 px-4 py-2">Pembimbing</th>
              <th className="border border-gray-300 px-4 py-2">Hari</th>

              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ekstras.map((ekstra, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ekstra.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ekstra.desc}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ekstra.category.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ekstra.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ekstra.pembimbing}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {day[ekstra.hari - 1]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <EditEkstra ekstra={ekstra} categories={categories} />
                  <DeleteEkstra ekstraId={ekstra.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">User</h2>
        <table className=" border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">NISN</th>
              <th className="border border-gray-300 px-4 py-2">NIS</th>
              <th className="border border-gray-300 px-4 py-2">Fullname</th>
              <th className="border border-gray-300 px-4 py-2">Kelamin</th>
              <th className="border border-gray-300 px-4 py-2">Kelas</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.nisn}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.nis}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.fullname}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.gender}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.kelas}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  <EditUser user={user} />
                  {user.nis != "admin" && <DeleteUser userId={user.id} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
