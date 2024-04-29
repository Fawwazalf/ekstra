"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      nis: nis,
      password: password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/beranda");
    }
    if (res?.error) {
      setError({ error });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-[539px] lg:h-[739px] bg-[#FFFFFF] bg-opacity-75 rounded-[40px] px-[44px] py-[77px] items-center gap-[58px] lg:mr-[25px]">
      <p className="text-[58px] font-bold w-min">Masuk</p>

      <form onSubmit={onSubmit} className="flex flex-col w-full gap-[20px]">
        <div className="flex flex-col items-start w-full gap-[5px]">
          <label>Masukkan ID EksTra</label>

          <input
            type="text"
            name="nis"
            className="w-full h-[57px] rounded-[9px] border border-[#ADADAD] pl-[25px]"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-start w-full gap-[5px]">
          <label>Masukkan Sandi</label>
          <input
            autoComplete="off"
            name="password"
            type="password"
            className="w-full h-[57px] rounded-[9px] border border-[#ADADAD] pl-[25px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!!error && (
          <div className="max-h-[0px] overflow-visible">
            <p
              className={
                error.status == 200
                  ? "text-green-600 text-center"
                  : `text-red-600 text-center`
              }
            >
              error
            </p>
          </div>
        )}
        <div className="mt-[60px] self-center w-min flex flex-col gap-[10px]">
          <button
            disabled={loading}
            type="submit"
            className="text-[#FFFFFF] font-bold text-[14px] bg-[#96BB7C] rounded-[5px] px-[100px] py-[20px] "
          >
            Masuk
          </button>
          <Link
            className="text-[#96BB7C] font-bold text-[14px] bg-[#ffffff] rounded-[5px] px-[100px] py-[20px] w-max"
            href="/daftar"
          >
            Daftar Ulang
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
