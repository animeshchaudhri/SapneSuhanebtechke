'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { cn } from "@/utils/cn";
import { useState } from "react";
import axios from 'axios';

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
    text: "Someting still happening",
  }
];

export default function Home() {
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async (image: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'jjot7td7'); // Replace 'your_upload_preset' with your Cloudinary upload preset
      const response = await fetch(`https://api.cloudinary.com/v1_1/dpf6c8boe/image/upload`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data: any = await response.json();
        return data.secure_url;
      } else {
        console.error('Failed to upload image to Cloudinary:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  const handleUploadImages = async () => {
    const uploadedImageUrls = await Promise.all(images.map(uploadImageToCloudinary));
    console.log('Uploaded Image URLs:', uploadedImageUrls);
    return uploadedImageUrls;
  };


  const [product, setProduct] = useState({
    title: '',
    MRP: '',
    retailPrice: '',
    sellingPrice: '',
    status: 'Active',
    length: '',
    breadth: '',
    height: ''
  });

  const handleChange = (e: any) => {
    e.preventDefault(); //
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  let iGotData: any;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(product);
    console.log("images:", images);
    const urls = await handleUploadImages();
    const data: any = []
    urls.forEach(ling => {
      data.push({ "imageLink": ling });
    });

    await axios.post('https://shopblues.onrender.com/process-images', {
      "data": data,
      // "details": product
    })
      .then(function (response) {
        iGotData = response.data
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios.post('https://shopblues.onrender.com/saveto', {
      "data": iGotData,
      "details": product
      // "details": product
    })
      .then(function (response) {
        // iGotData = response.data
        console.log("save to: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setLoading(false);
  };

  const [images, setImages] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setImages([...images, ...imageFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setImages([...images, ...imageFiles])
    console.log(images);
    ;
  };

  const handleRemoveImage = (index: number): void => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-24 container">
      <Loader loadingStates={loadingStates} loading={loading} duration={4000} />
      <section className="flex flex-col md:flex-row  gap-4 md:gap-10 w-full">
        <div className="max-w-sm w-full rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            1-by-1 Product Upload
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Please enter detalls of the product you want to sell. Please make sure the information is accurate.
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="product title">Product Title</Label>
              <Input placeholder="My Product" type="text" value={product.title} name='title' onChange={handleChange} />
            </LabelInputContainer>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="mrp">MRP</Label>
                <Input id="mrp" placeholder="₹ XXX.XX" type="text" value={product.MRP} name='MRP' onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Retail Price</Label>
                <Input id="lastname" placeholder="₹ XXX.XX" type="text" value={product.retailPrice} name='retailPrice' onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Selling Price</Label>
                <Input id="lastname" placeholder="₹ XXX.XX" type="text" value={product.sellingPrice} name='sellingPrice'
                  onChange={handleChange} />
              </LabelInputContainer>
            </div>
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
            </LabelInputContainer>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Length</Label>
                <Input id="firstname" placeholder="XX.XX m" type="text" value={product.length}
                  onChange={handleChange} name="length" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Breadth</Label>
                <Input id="lastname" placeholder="XX.XX m" type="text" value={product.breadth}
                  onChange={handleChange} name="breadth" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Height</Label>
                <Input id="lastname" placeholder="XX.XX m" type="text" value={product.height}
                  onChange={handleChange} name="height" />
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

        <div className="w-full flex flex-col items-end justify-center gap-10 rounded-2xl p-4 md:p-12 shadow-input bg-white dark:bg-black ">
          <div className="w-full h-full flex items-center justify-center gap-10 rounded-3xl p-4 md:p-12 shadow-input bg-white dark:bg-black overflow-auto max-h-[70vh] "
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
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
                      <button onClick={() => handleRemoveImage(index)}>Remove</button>
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
