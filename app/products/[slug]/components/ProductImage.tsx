"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useVariantContext } from "./VariantContext";

type Images = {
  images: Array<SingleImage>;
};

type SingleImage = {
  id: string;
  url: string;
  altText: string | null;
};

const ImageGallery = ({ images }: Images) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { selectedVariant } = useVariantContext();

  useEffect(() => {
    if (selectedVariant) {
      if (selectedVariant.image) {
        const variantImage = selectedVariant.image;
        const selectVariantImage: SingleImage =
          images.find((img) => img.id === variantImage.id) || images[0];
        setSelectedImage(selectVariantImage);
      } else {
        setSelectedImage(images[0]);
      }
    }
  }, [selectedVariant, images]);

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
          onClick={() => setIsPreviewOpen(true)}
        >
          <Image
            src={selectedImage.url}
            alt="Selected product image"
            className="object-cover transition-all duration-300 hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div
                key={image.url}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 transition-all duration-200 ${
                  selectedImage.url === image.url
                    ? "ring-blue-500 ring-offset-2"
                    : "ring-transparent hover:ring-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  className="object-cover hover:opacity-75 transition-opacity"
                  fill
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsPreviewOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={selectedImage.url}
              alt="Preview"
              className="object-contain"
              fill
              sizes="90vw"
              priority
            />
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto p-2 max-w-4xl">
            {images.map((image, index) => (
              <div
                key={image.url}
                className={`relative flex-shrink-0 w-20 aspect-square rounded-lg overflow-hidden cursor-pointer ring-2 transition-all duration-200 ${
                  selectedImage.url === image.url
                    ? "ring-blue-500 ring-offset-2 ring-offset-black"
                    : "ring-transparent hover:ring-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                }}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover hover:opacity-75 transition-opacity"
                  fill
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
