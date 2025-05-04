import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatCategoryMutation } from "@/store/apiSlices/categorySlice";
import { useCallback, useEffect, useRef, useState } from "react";
import useSetTimeout from "@/hooks/useSetTimeout";
import useCategoriesPagination from "@/hooks/useCategoriesPagination";
import { cn, errorToast, successToast } from "@/lib/utils";
import categoryValidation from "@/validations/categoryValidation";
import { ICategory, ICategoryType } from "@/types/types";
import CustomButton from "../buttons/CustomButton";
interface IAddCategoryFormProps {
  type: ICategoryType;
  refreshCategories: () => void;
}
function AddCategoryForm({ type, refreshCategories }: IAddCategoryFormProps) {
  const [name, setName] = useState("");
  const [creatCategoryMutation] = useCreatCategoryMutation();
  const [categories, setCategories] = useState([]);
  const { categories: categoriesResponse } = useCategoriesPagination({
    name,
    perPage: 5,
  });
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const { timeouter } = useSetTimeout();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof categoryValidation>>({
    resolver: zodResolver(categoryValidation),
  });

  const handleSearchCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      timeouter(() => {
        if (value.length > 1) setName(value);
        else setCategories([]);
      }, 1000);
    },
    [name]
  );
  const handleCategorySelection = (parentId: string, parentName: string) => {
    form.setValue("search", parentName);
    form.setValue("parentId", parentId);
    setShowCategories(false);
  };
  async function onSubmit(values: z.infer<typeof categoryValidation>) {
    try {
      let response = await creatCategoryMutation(values).unwrap();
      successToast(response);
      refreshCategories();
    } catch (error) {
      errorToast(error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideSearchInput = searchInputRef.current?.contains(
        event.target as Node
      );
      const isClickInsideSearchList = searchListRef.current?.contains(
        event.target as Node
      );
      if (!isClickInsideSearchInput && !isClickInsideSearchList) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    setCategories(categoriesResponse);
    console.log("categoriesResponse", categoriesResponse);
  }, [categoriesResponse]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
        <div className="gap-3 | flex flex-wrap rounded-md ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" basis-full">
                <FormControl>
                  <Input placeholder="category name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-wrap ">
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Parent</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    autoComplete="false"
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type == "child" && (
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem ref={categoriesRef} className="relative w-full">
                  <FormLabel className="">Parent</FormLabel>
                  <FormControl ref={searchInputRef}>
                    <Input
                      {...field}
                      onFocus={() => setShowCategories(true)}
                      onChangeCapture={handleSearchCategoryChange}
                      placeholder="search"
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                  {showCategories ? (
                    <div
                      ref={searchListRef}
                      className={cn(
                        (categories == undefined || categories?.length == 0) &&
                          "!hidden",
                        `absolute left-0 mt-2 top-full p-2 gap-2 w-full flex flex-col border rounded-md bg-white montserrat `
                      )}
                    >
                      {categories &&
                        categories.map((category: ICategory, i: number) => (
                          <div
                            key={i}
                            className=" py-1 px-2 rounded-md cursor-pointer hover:bg-slate-50"
                            onClick={() =>
                              handleCategorySelection(
                                category._id,
                                category.name
                              )
                            }
                          >
                            {category?.name}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </FormItem>
              )}
            />
          )}
        </div>
        <CustomButton className="w-full" theme="black" type="submit">
          submit
        </CustomButton>
      </form>
    </Form>
  );
}

export default AddCategoryForm;
