import Detail from "../../../components/Detail";
import prisma from "../../../../lib/prisma";
import Back from "../../../components/Back";

const getEkstra = async (id) => {
  const res = await prisma.ekstra.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      users: true,
    },
  });
  return res;
};

const page = async (props) => {
  const ekstra = await getEkstra(props.params.detail);

  return (
    <div>
      <Back />
      <Detail
        id={ekstra.id}
        name={ekstra.name}
        desc={ekstra.desc}
        categoryName={ekstra.categoryName}
        location={ekstra.location}
        pembimbing={ekstra.pembimbing}
        image={ekstra.image}
        anggota={ekstra.users.length}
        day={ekstra.hari - 1}
      />
    </div>
  );
};

export default page;
