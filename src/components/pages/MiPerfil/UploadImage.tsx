import { Box } from "@mui/material";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Cropper, type CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import Perfil from '../../../assets/perfil.jpg';

export const UploadIage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const cropperRef = useRef<CropperRef>(null);
    
    const [image, setImage] = useState<string>(Perfil);

    const onUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    // const onCrop = () => {
    //     const cropper = cropperRef.current;
    //     if (cropper) {
    //     const canvas = cropper.getCanvas();
    //     const newTab = window.open();
    //     if (newTab && canvas) {
    //         newTab.document.body.innerHTML = `<img src="${canvas.toDataURL()}"></img>`;
    //     }
    //     }
    // };

    const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
        event.target.value = "";
    };

    useEffect(() => {
        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    return(
        <Box>
            <Cropper
                ref={cropperRef}
                className="example__cropper"
                backgroundClassName="example__cropper-background"
                src={image}
            />
            <button className="example__button" onClick={onUpload}>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={onLoadImage}
                />
                Upload image
            </button>
        </Box>
    )
}