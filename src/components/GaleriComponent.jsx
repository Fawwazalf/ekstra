"use client";
import { useEffect, useState } from "react";

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

const GaleriComponent = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = (post) => {
    setSelectedPost(post);
    setIsPopupOpen(true);
  };

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

  const ekstra = [
    "Bulutangkis",
    "Stemba Science Club",
    "Ambalan",
    "Basket",
    "Stemba English Club",
    "Kamajayaratih",
    "Karawitan",
    "S-Teen",
    "Palang Merah Remaja",
    "Rohani Islam",
    "Voli",
    "Senaka",
    "Stemba Cinema",
    "Paduan Suara",
    "Sparta",
    "Paskibra",
    "Teater",
    "Sawaji",
    "KCCD",
    "Argapeta",
    "Silat",
  ];
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <img
            src={post.link}
            height="310"
            width="310"
            alt="Gambar Ekstra SMK Negeri 7 Semarang"
            className="w-[310px] h-[310px] object-cover aspect-square cursor-pointer"
            onClick={() => handleImageClick(post)}
            key={index}
          />
        ))
      ) : (
        <p>Tidak ada postingan</p>
      )}

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="absolute w-full h-full bg-black opacity-10"></div>
          <div className="absolute w-full h-full backdrop-filter backdrop-blur bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] w-[80%] h-[680px] flex flex-col justify-between  p-[10px]">
              <div className="flex justify-between px-[10px] w-full">
                <p>
                  Diunggah oleh {""}
                  <span className="font-bold">
                    {ekstra[selectedPost.ekstraId - 1]}
                  </span>
                </p>
                <p>{formatDate(selectedPost.createdAt)}</p>
              </div>
              <div className="flex flex-row gap-[50px]">
                <img
                  src={selectedPost.link}
                  alt="Selected Image"
                  className="w-[620px] h-[620px] object-cover"
                />
                <div className="overflow-y-scroll w-full ">
                  {" "}
                  <p>
                    {selectedPost.desc
                      ? selectedPost.desc
                      : "Tidak ada deskripsi"}
                  </p>
                </div>
              </div>
            </div>

            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsPopupOpen(false)}
              className="hover:cursor-pointer self-start "
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.6668 20C36.6668 29.2047 29.2048 36.6667 20.0002 36.6667C10.7954 36.6667 3.3335 29.2047 3.3335 20C3.3335 10.7953 10.7954 3.33334 20.0002 3.33334C29.2048 3.33334 36.6668 10.7953 36.6668 20ZM14.9495 14.9494C15.4377 14.4613 16.2291 14.4613 16.7173 14.9494L20.0002 18.2322L23.2828 14.9495C23.771 14.4613 24.5625 14.4613 25.0507 14.9495C25.5388 15.4376 25.5388 16.2291 25.0507 16.7172L21.7678 20L25.0507 23.2827C25.5388 23.7708 25.5388 24.5623 25.0507 25.0505C24.5625 25.5387 23.771 25.5387 23.2828 25.0505L20.0002 21.7678L16.7173 25.0505C16.2292 25.5387 15.4377 25.5387 14.9496 25.0505C14.4614 24.5623 14.4614 23.7708 14.9496 23.2828L18.2323 20L14.9495 16.7172C14.4614 16.229 14.4614 15.4376 14.9495 14.9494Z"
                fill="#252B42"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default GaleriComponent;
