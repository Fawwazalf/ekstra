"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CreateEkstra = ({ categories }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [day, setDay] = useState();
  const [pembimbing, setPembimbing] = useState();

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
    let imageUrl = image;
    try {
      if (image) {
        const filename = `${uuidv4()}-${image.name}`;

        const { data, error } = await supabase.storage
          .from("post")
          .upload(filename, image);
        const formData = new FormData();
        formData.append("image", image);

        imageUrl =
          "https://fjrtfjlcqdkjzxlsxlru.supabase.co/storage/v1/object/public/" +
          data.fullPath;
      }

      await fetch(`/api/ekstra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          image: imageUrl,
          desc: desc,
          category: parseInt(category),
          location: location,
          day: parseInt(day),
          pembimbing: pembimbing,
        }),
      });
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating ekstra:", error);
    }
  };

  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className=" text-white px-2 py-1 rounded bg-[#96BB7C]"
      >
        Tambah Ekstra
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="absolute w-full h-full backdrop-filter backdrop-blur bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] w-[640px] h-[680px] flex flex-col items-center justify-between p-[10px] overflow-y-scroll   ">
              <div className="w-full h-max ">
                <div className="w-full mb-[16px]">
                  <label htmlFor="name">Nama:</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="image">Gambar:</label>
                  <input
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full max-h-[300px]">
                  <label htmlFor="desc">Deskripsi:</label>
                  <textarea
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded h-min max-h-[200px]  "
                  />
                </div>

                <div className="w-full mb-[16px]">
                  <label htmlFor="location">Lokasi:</label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="pembimbing" className="mr-2">
                    Pembimbing:
                  </label>
                  <input
                    id="pembimbing"
                    type="text"
                    value={pembimbing}
                    onChange={(e) => setPembimbing(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="category">Kategori:</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  >
                    {categories.map((d, index) => {
                      return (
                        <option key={index} value={index + 1}>
                          {d.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="day">Hari:</label>
                  <select
                    id="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  >
                    {hari.map((d, index) => (
                      <option key={index} value={index + 1}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
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
                  onClick={() => handleUpdate()}
                  className="bg-[#96BB7C]  text-white px-4 py-2 rounded mt-3"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEkstra;
