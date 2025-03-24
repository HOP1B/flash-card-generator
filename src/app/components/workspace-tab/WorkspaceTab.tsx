"use client";
import { Button } from "@/components/ui/button";
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
import { X } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import { SetGroups, WorkspaceTab } from "../../../../types/sideBarGroup";
import { Group } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const WorkSpaceTab = ({
  // setShowWorkSpace,
  // setGroups,
  // groups,
}: {
  setShowWorkSpace: WorkspaceTab;
  setGroups: SetGroups;
  groups: Group;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/todo", 
        // data
      );
      console.log(response.data);
      // setGroups([...groups, response.data]);
      toast.success("Todo implemented successfully.");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Can not add todo!");
    }
    console.log(values);
  };
  return (
    <div className="fixed bg-[#c0c6c86a] z-30 inset-0 flex items-center justify-center">
      <div className="w-[640px] p-[30px] z-30 absolute left-[600px] bg-white rounded-xl ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-[#1d1d1d] font-inter text-xl font-bold pb-6 flex items-center justify-between">
                      New Workspace
                    </FormLabel>
                    <Button
                      className="bg-inherit hover:bg-[#dcdcdc] p-2 shadow-none text-[#5e5e5e] "
                      // onClick={() => setShowWorkSpace(false)}
                    >
                      <X size={30} />
                    </Button>
                  </div>
                  <FormDescription className="font-inter text-[#616161] text-base font-semibold pb-6">
                    Enter the name of your new Workspace
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                className="w-[283px] bg-inherit hover:bg-[#dcdcdc] text-[#1d1d1d] border border-[#1d1d1d] py-3 px-4 shadow-none text-base font-inter font-semibold "
                // onClick={() => setShowWorkSpace(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-[283px] bg-[#6f47eb] hover:bg-[#5f3cca] text-white py-3 px-4 shadow-none text-base font-inter font-semibold "
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
