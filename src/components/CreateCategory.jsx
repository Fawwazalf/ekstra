"use client";
import { useEffect, useState } from "react";

const CreateCategory = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

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
      const response = await fetch(`/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const info = await response.json();
      setError(info);
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className=" text-white px-2 py-1 rounded bg-[#96BB7C]"
      >
        Tambah Kategori
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="absolute w-full h-full backdrop-filter backdrop-blur bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] w-[640px] h-[680px] flex flex-col items-center justify-between p-[10px]">
              <div className="w-full h-max ">
                <div className="w-full mb-[16px]">
                  <label htmlFor="name">Name:</label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-3"
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

export default CreateCategory;
