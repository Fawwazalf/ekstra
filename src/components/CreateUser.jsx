"use client";
import { useEffect, useState } from "react";

const jurusanSMK7 = [
  "KGSP",
  "KJIJ",
  "TITL",
  "TFLM",
  "TMPO",
  "TME",
  "TEDK",
  "SIJA",
  "admin",
];

const kelasSMK7 = [
  "X KGSP 1",
  "XI KGSP 1",
  "XII KGSP 1",
  "XIII KGSP 1",
  "X KGSP 2",
  "XI KGSP 2",
  "XII KGSP 2",
  "XIII KGSP 2",
  "X KJIJ 1",
  "XI KJIJ 1",
  "XII KJIJ 1",
  "XIII KJIJ 1",
  "X KJIJ 2",
  "XI KJIJ 2",
  "XII KJIJ 2",
  "XIII KJIJ 2",
  "X TITL 1",
  "XI TITL 1",
  "XII TITL 1",
  "X TITL 2",
  "XI TITL 2",
  "XII TITL 2",
  "X TFLM 1",
  "XI TFLM 1",
  "XII TFLM 1",
  "XIII TFLM 1",
  "X TFLM 2",
  "XI TFLM 2",
  "XII TFLM 2",
  "XIII TFLM 2",
  "X TMPO 1",
  "XI TMPO 1",
  "XII TMPO 1",
  "X TMPO 2",
  "XI TMPO 2",
  "XII TMPO 2",
  "X TME 1",
  "XI TME 1",
  "XII TME 1",
  "X TME 2",
  "XI TME 2",
  "XII TME 2",
  "X TEDK 1",
  "XI TEDK 1",
  "XII TEDK 1",
  "X TEDK 2",
  "XI TEDK 2",
  "XII TEDK 2",
  "X SIJA 1",
  "XI SIJA 1",
  "XII SIJA 1",
  "XIII SIJA 1",
  "X SIJA 2",
  "XI SIJA 2",
  "XII SIJA 2",
  "XIII SIJA 2",
  "admin",
];

const CreateUser = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [NISN, setNISN] = useState("");
  const [NIS, setNIS] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nis: NIS,
          nisn: NISN,
          fullname: fullname,
          gender: gender,
          kelas: kelas,
          jurusan: jurusan,
        }),
      });
      const info = await response.json();
      setLoading(false);
      setError(info);
      if (error.message != "Semua data harus diisi") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className=" text-white px-2 py-1 rounded bg-[#96BB7C]"
      >
        Tambah User
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="absolute w-full h-full backdrop-filter backdrop-blur bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] w-[640px] h-[680px] flex flex-col items-center  p-[10px]">
              <div className="w-full h-max ">
                <div className="w-full mb-[16px]">
                  <label htmlFor="NISN">NISN:</label>

                  <input
                    id="NISN"
                    type="text"
                    value={NISN}
                    onChange={(e) => setNISN(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="NIS">NIS:</label>

                  <input
                    id="NIS"
                    type="text"
                    value={NIS}
                    onChange={(e) => setNIS(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="fullname">Fullname:</label>

                  <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="gender">Kelamin:</label>

                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  >
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="kelas">Kelas:</label>

                  <select
                    name="kelas"
                    id="kelas"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  >
                    {kelasSMK7.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="jurusan">Jurusan:</label>

                  <select
                    name="jurusan"
                    id="jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  >
                    {jurusanSMK7.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
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
              </div>
              <div className="flex justify-between w-[90%]">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Batal
                </button>
                <button
                  disabled={loading}
                  onClick={handleUpdate}
                  className="bg-[#96BB7C] text-white px-4 py-2 rounded mt-3"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUser;
