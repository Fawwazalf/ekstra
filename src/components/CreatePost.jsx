"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CreatePost = (props) => {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [desc, setDesc] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (file.name) {
      const filename = `${uuidv4()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("post")
        .upload(filename, file);

      const filepath = data.path;
      if (data) {
        try {
          const responseFetch = await fetch(`/api/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              link:
                "https://fjrtfjlcqdkjzxlsxlru.supabase.co/storage/v1/object/public/" +
                data.fullPath,
              ekstraId: parseInt(props.ekstraId),
              desc: desc,
            }),
          });
          setLoading(false);
          window.location.reload();
        } catch (error) {
          setLoading(false);
          console.error("Terjadi kesalahan:", error);
        }
      } else {
        setLoading(false);
        console.log(error);
      }
    } else {
      setLoading(false);
      setError({ status: 400, message: "Gambar harus diisi" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className=" text-white px-2 py-1 rounded bg-[#96BB7C]"
      >
        Tambah Postingan
      </button>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="absolute w-full h-full backdrop-filter backdrop-blur bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] w-[640px] h-[680px] flex flex-col items-center  justify-between p-[10px]">
              <div className="w-full">
                <div className="w-full mb-[16px]">
                  <label htmlFor="image">Gambar:</label>
                  <input
                    id="image"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full max-h-[300px]">
                  <label htmlFor="desc">Deskripsi(opsional):</label>
                  <textarea
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded h-min max-h-[200px]  "
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
              </div>
              <div className="flex justify-between  w-[90%]">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-red-500 text-white px-2 py-1 rounded "
                >
                  Tutup
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-[#96BB7C] text-white px-4 py-2 rounded mt-3"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
