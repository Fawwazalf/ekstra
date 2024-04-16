import FormLogin from "../../components/FormLogin";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/beranda");
  }
  return (
    <>
      <Image
        src="/img/Stemba.jpeg"
        width={1400}
        height={800}
        quality={100}
        alt="Background"
        className="h-screen w-screen object-cover absolute -z-10"
      />
      <div className="absolute right-0 flex items-center justify-center h-screen">
        <FormLogin />
      </div>
    </>
  );
};

export default Login;
