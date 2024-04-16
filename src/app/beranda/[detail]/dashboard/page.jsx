import { getServerSession } from "next-auth";
import ButtonUpload from "../../../../components/ButtonUpload";
import prisma from "../../../../../lib/prisma";
import { authOptions } from "../../../../../lib/auth";
import { redirect } from "next/navigation";
import DeletePost from "../../../../components/DeletePost";
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

  const ekstra = await prisma.ekstra.findUnique({
    where: {
      id: parseInt(props.params.detail),
    },
    include: {
      users: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (user.fullname != ekstra.name) {
    redirect("/beranda/" + props.params.detail);
  }

  const posts = await prisma.post.findMany();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">
        Dashboard Ekstra {ekstra.name}
      </h1>
      <div className="flex justify-between">
        <ButtonUpload ekstraId={props.params.detail} />
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Postingan</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
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
                  {formatDate(post.createdAt)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <DeletePost link={post.link} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Anggota</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Ekstra ID</th>
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
                  {anggota.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {anggota.ekstraId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
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
  );
};

export default page;
