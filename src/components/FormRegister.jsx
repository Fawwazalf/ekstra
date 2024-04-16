"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nis: nis,
          password: password,
        }),
      });

      const info = await res.json();
      if (info.status == 200) {
        router.push("/masuk");
      }
      setError(info);
    } else {
      setError({ message: "Konfirmasi password salah" });
    }
  };

  return (
    <div className="flex flex-col w-[539px] h-[739px] bg-[#FFFFFF] bg-opacity-75 rounded-[40px] px-[44px] py-[40px] items-center gap-[58px] mr-[25px]">
      <p className="text-[58px] font-bold w-min">Daftar</p>

      <form onSubmit={onSubmit} className="flex flex-col w-full gap-[10px]">
        <div className="flex flex-col items-start w-full gap-[3px]">
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
        <div className="flex flex-col items-start w-full gap-[3px]">
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
        <div className="flex flex-col items-start w-full gap-[3px]">
          <label>Konfirmasi Sandi</label>
          <input
            autoComplete="off"
            name="confirmPassword"
            type="password"
            className="w-full h-[57px] rounded-[9px] border border-[#ADADAD] pl-[25px]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {!!error && (
          <div className="max-h-[0px] overflow-visible">
            <p
              className={
                error.status == 200
                  ? "text-green-600 text-center"
                  : "text-red-600 text-center"
              }
            >
              {error.message}
            </p>
          </div>
        )}
        <div className="mt-[60px] self-center w-min flex flex-col gap-[10px]">
          <button
            type="submit"
            className="text-[#FFFFFF] font-bold text-[14px] bg-[#96BB7C] rounded-[5px] px-[100px] py-[20px] w-max"
          >
            Daftar Ulang
          </button>
          <Link
            className="text-[#96BB7C] font-bold text-[14px] bg-[#ffffff] rounded-[5px] px-[100px] py-[20px] text-center"
            href="/masuk"
          >
            Masuk
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
