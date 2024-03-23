"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { cn } from "@/utils/cn";
import { useState } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { set } from "lodash";

const loadingStates = [
  {
    text: "Uploading images",
  },
  {
    text: "Processing images",
  },
  {
    text: "Generating product details",
  },
  {
    text: "Calling Database",
  },
  {
    text: "Something still happening",
  },
];

export default function Home() {
  const handleExport = (e: any) => {
    e.preventDefault();
    const dataa = {
      data: genData,
      details: product,
    };

    fetch("https://shopblues.onrender.com/saveto", {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(dataa),
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "product.csv";
        link.click();
        window.URL.revokeObjectURL(url);
      });
  };

  const handleImageDownload = (e: any) => {
    e.preventDefault();
    // const dataa = {
    //   data: genData,
    //   details: product,
    // };

    fetch(genData.productImage, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "GET",
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "product1.png";
        link.click();
        window.URL.revokeObjectURL(url);
      });
  };

  const [formOneSubmitted, setFormOneSubmitted] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async (
    image: File
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "jjot7td7"); // Replace 'your_upload_preset' with your Cloudinary upload preset
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dpf6c8boe/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data: any = await response.json();
        return data.secure_url;
      } else {
        console.error(
          "Failed to upload image to Cloudinary:",
          response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const handleUploadImages = async () => {
    const uploadedImageUrls = await Promise.all(
      images.map(uploadImageToCloudinary)
    );
    console.log("Uploaded Image URLs:", uploadedImageUrls);
    return uploadedImageUrls;
  };

  const [product, setProduct] = useState({
    title: "",
    MRP: "",
    retailPrice: "",
    sellingPrice: "",
    status: "Active",
    length: "",
    breadth: "",
    height: "",
  });

  const [genData, setGenData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productImage: "",
    lifestyleImage: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault(); //
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleGenChange = (e: any) => {
    e.preventDefault(); //
    const { name, value } = e.target;
    setGenData({
      ...genData,
      [name]: value,
    });
  };

  let generatedData: any;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(product);
    console.log("images:", images);
    const urls = await handleUploadImages();
    const data: any = [];
    urls.forEach((ling) => {
      data.push({ imageLink: ling });
    });

    await axios
      .post("https://shopblues.onrender.com/process-images", {
        data: data,
        // "details": product
      })
      .then(function (response) {
        generatedData = response.data;
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios
      .post("https://shopblues.onrender.com/saveto", {
        data: generatedData,
        details: product,
        // "details": product
      })
      .then(function (response) {
        // iGotData = response.data
        console.log("save to: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setGenData(generatedData);
    setFormOneSubmitted(true);
    setLoading(false);
  };

  const [images, setImages] = useState<File[]>([]);

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages([...images, ...imageFiles]);
    console.log(images);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages([...images, ...imageFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const HandleOpenEditor = () => {
    editorOpen ? setEditorOpen(false) : setEditorOpen(true);
  };
  const handleRemoveImage = (index: number): void => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-24 container">
      <Loader loadingStates={loadingStates} loading={loading} duration={6000} />
      {!formOneSubmitted ? (
        <section className="flex flex-col md:flex-row  gap-4 md:gap-10 w-full">
          <div className="max-w-sm w-full rounded-2xl p-4 md:p-8 shadow-input bg-white/10 dark:bg-black/10 backdrop-blur-sm">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Product Upload
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Please enter detalls of the product you want to sell. Please make
              sure the information is accurate.
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="product title">Product Title</Label>
                <Input
                  placeholder="My Product"
                  type="text"
                  value={product.title}
                  name="title"
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="mrp">MRP</Label>
                  <Input
                    id="mrp"
                    placeholder="₹ XXX.XX"
                    type="text"
                    value={product.MRP}
                    name="MRP"
                    onChange={handleChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Retail Price</Label>
                  <Input
                    id="lastname"
                    placeholder="₹ XXX.XX"
                    type="text"
                    value={product.retailPrice}
                    name="retailPrice"
                    onChange={handleChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Selling Price</Label>
                  <Input
                    id="lastname"
                    placeholder="₹ XXX.XX"
                    type="text"
                    value={product.sellingPrice}
                    name="sellingPrice"
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="status">Status</Label>
                <select
                  className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
          group-hover/input:shadow-none transition duration-400"
                  value={product.status}
                  name="status"
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </LabelInputContainer>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="firstname">Length</Label>
                  <Input
                    id="firstname"
                    placeholder="XX.XX m"
                    type="text"
                    value={product.length}
                    onChange={handleChange}
                    name="length"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Breadth</Label>
                  <Input
                    id="lastname"
                    placeholder="XX.XX m"
                    type="text"
                    value={product.breadth}
                    onChange={handleChange}
                    name="breadth"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Height</Label>
                  <Input
                    id="lastname"
                    placeholder="XX.XX m"
                    type="text"
                    value={product.height}
                    onChange={handleChange}
                    name="height"
                  />
                </LabelInputContainer>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Submit
                <BottomGradient />
              </button>
            </form>
          </div>

          <div className="w-full flex flex-col items-end justify-center gap-10 rounded-2xl p-4 md:p-12 shadow-input bg-white/10 dark:bg-black/10 backdrop-blur-sm  ">
            <div
              className="w-full h-full flex items-center justify-center gap-10 rounded-3xl p-4 md:p-12 shadow-input overflow-auto max-h-[70vh] "
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                {/* Drag & Drop your images */}
                {images.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-4">
                    {images.map((file, index) => (
                      <li key={index}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded ${index + 1}`}
                          className="max-h-24 max-w-full"
                        />
                        <button onClick={() => handleRemoveImage(index)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Drop your images here or click the button below to add them.
                  </p>
                )}
              </h2>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
            />
          </div>
        </section>
      ) : (
        <section className="flex flex-col md:flex-row  gap-4 md:gap-10 w-full">
          <div className="max-w-sm w-full rounded-2xl p-4 md:p-8 shadow-input bg-white/10 dark:bg-black/10 backdrop-blur-sm">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Generated Details
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Please check the AI generated details of the product you want to
              sell. Please make sure the information is accurate.
            </p>

            <form className="my-8">
              <LabelInputContainer className="mb-4">
                <Label htmlFor="product title">Product Name</Label>
                <Input
                  placeholder="XYZ"
                  type="text"
                  value={genData.productName}
                  name="productName"
                  onChange={handleGenChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="product title">Product Category</Label>
                <Input
                  placeholder="XYZ Category"
                  type="text"
                  value={genData.productCategory}
                  name="productCategory"
                  onChange={handleGenChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="product title">Product Description</Label>
                <Input
                  placeholder="My Product"
                  type="text"
                  value={genData.productDescription}
                  name="productDescription"
                  onChange={handleGenChange}
                />
              </LabelInputContainer>
              {/*               
              <LabelInputContainer className="mb-4">
                <Label htmlFor="status">Status</Label>
                <select className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
          group-hover/input:shadow-none transition duration-400" value={product.status} name="status"
                  onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </LabelInputContainer> */}
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Publish
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

              <button
                className="bg-gradient-to-br mb-8 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                onClick={handleExport}
              >
                Export to CSV
                <BottomGradient />
              </button>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                onClick={handleImageDownload}
              >
                Export Images
                <BottomGradient />
              </button>
            </form>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-10 rounded-2xl p-4 md:p-12 shadow-input bg-white/10 dark:bg-black/10 backdrop-blur-sm  ">
            {!editorOpen ? (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-lg"
              >
                <CarouselContent>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            {index === 0 ? (
                              <img
                                src={genData.productImage}
                                className="bg-cover"
                              />
                            ) : (
                              <img
                                src={genData.productImage}
                                className="bg-cover"
                              />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://photokit.com/editor/?lang=en"
                // Optionally hide the iframe if it shouldn't be visible
              />
            )}
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={HandleOpenEditor}
            >
              Edit in editor
              <BottomGradient />
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
