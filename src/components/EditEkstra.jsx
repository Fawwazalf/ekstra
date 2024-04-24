"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const EditEkstra = ({ ekstra, categories }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newImage, setNewImage] = useState();
  const [newDesc, setNewDesc] = useState(ekstra.desc);
  const [newCategory, setNewCategory] = useState(ekstra.categoryId);
  const [newLocation, setNewLocation] = useState(ekstra.location);
  const [newDay, setNewDay] = useState(ekstra.hari);
  const [newPembimbing, setNewPembimbing] = useState(ekstra.pembimbing);

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
      let imageUrl = ekstra.image;
      if (newImage) {
        const filename = `${uuidv4()}-${newImage.name}`;

        const { data, error } = await supabase.storage
          .from("post")
          .upload(filename, newImage);
        const formData = new FormData();
        formData.append("image", newImage);

        imageUrl =
          "https://fjrtfjlcqdkjzxlsxlru.supabase.co/storage/v1/object/public/" +
          data.fullPath;
      }

      await fetch(`/api/ekstra/${ekstra.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newImage: imageUrl,
          newDesc: newDesc,
          newCategory: parseInt(newCategory),
          newLocation: newLocation,
          newDay: parseInt(newDay),
          newPembimbing: newPembimbing,
        }),
      });
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating ekstra:", error);
    }
  };

  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className=" text-white px-2 py-1 rounded bg-[#96BB7C]"
      >
        Edit
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="absolute w-full h-full backdrop-filter backdrop-blur bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] w-[640px] h-[680px] flex flex-col items-center justify-between p-[10px] overflow-y-scroll   ">
              <div className="w-full h-max ">
                <div className="w-full mb-[16px]">
                  <label htmlFor="newImage">Gambar:</label>
                  <input
                    id="newImage"
                    type="file"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full max-h-[300px]">
                  <label htmlFor="newDesc">Deskripsi:</label>
                  <textarea
                    id="newDesc"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded h-min max-h-[200px]  "
                  />
                </div>

                <div className="w-full mb-[16px]">
                  <label htmlFor="newLocation">Lokasi:</label>
                  <input
                    id="newLocation"
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="newPembimbing" className="mr-2">
                    Pembimbing:
                  </label>
                  <input
                    id="newPembimbing"
                    type="text"
                    value={newPembimbing}
                    onChange={(e) => setNewPembimbing(e.target.value)}
                    placeholder="New Pembimbing"
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  />
                </div>
                <div className="w-full mb-[16px]">
                  <label htmlFor="newCategory">Kategori:</label>
                  <select
                    id="newCategory"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
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
                  <label htmlFor="newDay">Hari:</label>
                  <select
                    id="newDay"
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
                  >
                    {day.map((d, index) => (
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

export default EditEkstra;
