import { useState } from "react";
import { useFetchCategoriesQueryQuery as useFetchCategoriesQueryQuery } from "@/store/apiSlices/categorySlice";
import AddCategoryPortal from "@/components/portals/AddCategoryPortal";
import { BiEditAlt } from "react-icons/bi";
function CategoriesPage() {
  const [addCategory, setAddCategory] = useState(false);
  const { data: response, refetch } = useFetchCategoriesQueryQuery({});
  return (
    <>
      <AddCategoryPortal
        addCategory={addCategory}
        setAddCategory={setAddCategory}
        refreshCategories={refetch}
      />

      <div className=" p-6 flex flex-col">
        <div className=" mb-6 flex justify-between font-bold text-blue-600">
          <h1 className="  ">categories list</h1>
          <div
            className="cursor-pointer hover:underline"
            onClick={() => setAddCategory(true)}
          >
            Add new category +
          </div>
        </div>

        <div className="columns-4 ">
          {response?.categories &&
            response?.categories.length > 0 &&
            response?.categories.map((category: any) => (
              <div key={category._id} className="">
                <div className="c4 m-3 p-3 flex items-center rounded-lg border border-slate-100 bg-white">
                  <div className="grow">{category.name}</div>
                </div>
                <div className="flex flex-col">
                  {category.children &&
                    category.children.length > 0 &&
                    category.children.map((category: any) => (
                      <>
                        <div
                          key={category._id}
                          className="c3 m-3 p-3 flex items-center font-semibold"
                        >
                          <div className="grow">{category.name}</div>
                          <BiEditAlt />
                        </div>
                        {category.children &&
                          category.children.length > 0 &&
                          category.children.map((category: any) => (
                            <div
                              key={category._id}
                              className="c3 m-3 p-3 flex justify-between items-center"
                            >
                              {category.name}
                              <BiEditAlt />
                            </div>
                          ))}
                      </>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
