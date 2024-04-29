import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { authOptions } from "../../../../../lib/auth";
import { redirect } from "next/navigation";
import CreatePost from "../../../../components/CreatePost";
import DeletePost from "../../../../components/DeletePost";
import EditEkstra from "../../../../components/EditEkstra";
import DeleteAnggota from "../../../../components/DeleteAnggota";
const formatDate = (dateString) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
};
const page = async (props) => {
  const session = await getServerSession(authOptions);
  const categories = await prisma.category.findMany({
    include: {
      ekstras: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  const ekstra = await prisma.ekstra.findUnique({
    where: {
      id: parseInt(props.params.detail),
    },
    include: {
      users: {
        include: {
          user: true,
        },
      },
    },
  });

  const userSession = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (userSession.fullname === ekstra.name) {
  } else if (userSession.nis === "admin") {
  } else {
    redirect("/beranda/" + props.params.detail);
  }
  const posts = await prisma.post.findMany();

  return (
    <div className="container mx-[30px]  mt-10">
      <h1 className="text-2xl font-bold mb-5">
        Dashboard Ekstra {ekstra.name}
      </h1>
      <div className="flex gap-[100px] ">
        <CreatePost ekstraId={props.params.detail} />
        <EditEkstra ekstra={ekstra} categories={categories} />
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Postingan</h2>
        <div className="">
          <table className=" border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Gambar</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={post.link} className="underline ">
                      link
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.desc}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <DeletePost link={post.link} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Anggota</h2>
        <div className="">
          <table className=" border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">NIS</th>
                <th className="border border-gray-300 px-4 py-2">Fullname</th>
                <th className="border border-gray-300 px-4 py-2">Kelas</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ekstra.users.map((anggota, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {anggota.user.nis}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {anggota.user.fullname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {anggota.user.kelas}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <DeleteAnggota
                      anggotaId={anggota.userId}
                      ekstraId={parseInt(props.params.detail)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
