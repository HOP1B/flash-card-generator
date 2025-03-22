'use client';
import { Button } from "@/components/ui/button";
// import { Plus, X } from "lucide-react";
// import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export function ProfileForm() {
  
}

export const WorkspaceTab = () => {
    const [showWorkSpace, setShowWorkSpace] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    // <div>
    //   {!showWorkSpace && (
    //     <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
    //       Workspaces
    //       <Button
    //         onClick={() => setShowWorkSpace(true)}
    //         className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
    //       >
    //         <Plus className="text-[#777777]" />
    //       </Button>
    //     </div>
    //   )}
    //   {showWorkSpace && (
    //     <div>
    //       <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
    //         Workspaces
    //         <Button
    //           onClick={() => setShowWorkSpace(false)}
    //           className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
    //         >
    //           <Plus className="text-[#777777]" />
    //         </Button>
    //       </div>
    //       <div className="w-[640px] p-[30px] z-30 absolute left-[600px] bg-white rounded-xl ">
    //         <h1 className="text-[#1d1d1d] font-inter text-xl font-bold mb-6 flex items-center justify-between">
    //           New Workspace
    //           <Button
    //             className="bg-inherit hover:bg-[#dcdcdc] p-2 shadow-none text-[#5e5e5e] "
    //             onClick={() => setShowWorkSpace(false)}
    //           >
    //             <X size={30} />
    //           </Button>
    //         </h1>
    //         <form>
    //           <p className="font-inter text-[#616161] text-base font-semibold mb-6 ">
    //             Enter the name of your new Workspace
    //           </p>
    //           <label>
    //             <input
    //               type="text"
    //               placeholder="Enter name here"
    //               className="w-[578px] placeholder:text-[#e5e7eb] border border-[#e5e7eb]  text-base font-inter font-semibold py-3 px-2 rounded-xl mb-8"
    //             />
    //           </label>
    //           <div className="flex justify-between ">
    //             <Button
    //               className="w-[283px] bg-inherit hover:bg-[#dcdcdc] text-[#1d1d1d] border border-[#1d1d1d] py-3 px-4 shadow-none text-base font-inter font-semibold "
    //               onClick={() => setShowWorkSpace(false)}
    //             >
    //               Cancel
    //             </Button>
    //             <Button className="w-[283px] bg-[#6f47eb] hover:bg-[#5f3cca] text-white py-3 px-4 shadow-none text-base font-inter font-semibold ">
    //               Create
    //             </Button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div>
      {!showWorkSpace && (
        <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
          Workspaces
          <Button
            onClick={() => setShowWorkSpace(true)}
            className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
          >
            <Plus className="text-[#777777]" />
          </Button>
        </div>
      )}

      {showWorkSpace && (
        <div>
          <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
            Workspaces
            <Button
              onClick={() => setShowWorkSpace(true)}
              className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
            >
              <Plus className="text-[#777777]" />
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Workspace</FormLabel>
                    <FormDescription>
                      Enter the name of your new Workspace
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Enter name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
