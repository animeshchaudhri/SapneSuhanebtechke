'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { create } from 'zustand'


import { cn } from "@/utils/cn";
// hello bro
export default function Home() {
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-24 container">
      <section className="flex flex-col md:flex-row  gap-4 md:gap-10 w-full">
        <div className="max-w-sm w-full rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            1-by-1 Product Upload
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Please enter detalls of the product you want to sell. Please make sure the information is accurate.
          </p>

          <form className="my-8" >
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Product Title</Label>
              <Input id="email" placeholder="My Product " type="text" />
            </LabelInputContainer>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">MRP</Label>
                <Input id="firstname" placeholder="₹ XXX.XX" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Retail Price</Label>
                <Input id="lastname" placeholder="₹ XXX.XX" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Selling Price</Label>
                <Input id="lastname" placeholder="₹ XXX.XX" type="text" />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="status">Status</Label>
              {/* <Input id="password" placeholder="" type="dropdown" />
               */}
              <select name="cars" id="cars" className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
          group-hover/input:shadow-none transition duration-400">
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </LabelInputContainer>
            {/* <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Your twitter password</Label>
              <Input
                id="twitterpassword"
                placeholder="••••••••"
                type="twitterpassword"
              />
            </LabelInputContainer> */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Length</Label>
                <Input id="firstname" placeholder="XX.XX m" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Breadth</Label>
                <Input id="lastname" placeholder="XX.XX m" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Height</Label>
                <Input id="lastname" placeholder="XX.XX m" type="text" />
              </LabelInputContainer>
            </div>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Submit
              <BottomGradient />
            </button>

            {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4"> */}


            {/* </div> */}
          </form>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-10 rounded-2xl p-4 md:p-12 shadow-input bg-white dark:bg-black ">
          {/* <Image
            src="/test-input.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
          />

          <div className="flex w-full gap-4 align-centre justify-between"> */}
          {/* <Input  className="w-96" id="firstname" placeholder="upload your image" type="text" />
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-40 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              select &rarr;
              <BottomGradient />
            </button> */}
          {/* </div> */}
          <div className="w-full h-full flex items-center justify-center gap-10 rounded-3xl p-4 md:p-12 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Drag & Drop your images
            </h2>
          </div>
          <button
              className="bg-gradient-to-br w-full relative p-4 group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 max-w-32 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex items-center justify-center"
              type="submit"
            >
              Upload
              <BottomGradient />
            </button>
        </div>
      </section>
    </main>
  );
}
