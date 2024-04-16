"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ButtonUpload = (props) => {
  const [file, setfile] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          }),
        });
        setfile({ name: "Berhasil" });
        window.location.reload();
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    } else {
      console.log(error);
    }
  };

  const handleFileSelected = (e) => {
    setfile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="image"
        onChange={handleFileSelected}
        accept="image/*"
      />
      <button type="submit">
        Upload {file && file.name === "Berhasil" ? "Berhasil" : ""}
      </button>
    </form>
  );
};

export default ButtonUpload;
