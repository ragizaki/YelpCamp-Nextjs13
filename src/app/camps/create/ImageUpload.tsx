"use client";

import { type Dispatch, type SetStateAction } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";

interface Props {
  setPhoto: Dispatch<
    SetStateAction<{
      name: string;
      description: string;
      city: string;
      country: string;
      price: number;
      photo: string;
    }>
  >;
}

const uploader = Uploader({
  apiKey: "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
};

const ImageUpload = ({ setPhoto }: Props) => {
  return (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhoto((prevFormData) => ({
            ...prevFormData,
            photo: file[0].fileUrl.replace("raw", "thumbnail"),
          }));
          console.log(file[0]);
        }
      }}
      width="670px"
      height="250px"
    />
  );
};

export default ImageUpload;
