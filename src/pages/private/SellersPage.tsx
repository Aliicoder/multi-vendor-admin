import React, { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import useSellersPagination from "@/hooks/useSellerPagination";

import { TbFilter } from "react-icons/tb";
import { ISeller, IUser } from "@/types/types";

import CustomButton from "@/components/buttons/CustomButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiSearch } from "react-icons/ci";
import Selection from "@/components/Selection";
import useSetTimeout from "@/hooks/useSetTimeout";
import { errorToast, getInitials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loaders/Loader";
const STATUS = { active: "#008000", inactive: "#ff0000" };
const PAYMENT = { pending: "#ff0000", fulfilled: "#008000" };

type ISellerStatus = "active" | "inactive";
type ISellerPayment = "pending" | "fulfilled";

function AdminSellers() {
  const [name, setName] = useState("");
  const [perPage, setPerPage] = useState(8);
  const [openFilter, setOpenFilter] = useState(false);
  const [sellerStatus, setSellerStatus] = useState<ISellerStatus>("active");
  const [sort, setSort] = useState<any>({});
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { sellers, counter, handleLeft, handleRight, isLoading } =
    useSellersPagination({
      name,
      roles: "seller",
      sellerStatus,
      perPage,
      sort,
    });
  const { timeouter } = useSetTimeout();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    console.log(value);
    timeouter(() => {
      setName(value);
    }, 2000);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value == "") {
      const { [event.target.name]: _, ...rest } = sort;
      setSort(rest);
    } else setSort({ ...sort, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="relative p-6 flex flex-col ">
        {isLoading && <Loader />}
        <div className="relative gap-5 py-6 flex  items-center  font-normal ">
          <div
            className=" px-2 py-3 text-blue-500  flex items-center h-9 border text-sm 
          shadow-sm rounded-lg overflow-hidden bg-white border-neutral-200"
          >
            <div className="fs-20  font-bold ">
              <CiSearch className="m-1 cursor-pointer " />
            </div>
            <input
              onChange={handleSearchChange}
              placeholder="search "
              className={`pl-3  w-full font-sans  outline-none bg-inherit`}
              type="text"
            />
          </div>
          <Selection
            title="status"
            defaultOption={sellerStatus}
            options={["active", "inactive"]}
            setOption={setSellerStatus}
          />
        </div>

        <div className="relative fs-20 py-6 gap-3 flex items-center">
          <Select
            onValueChange={(value) => handleSortChange("createdAt", value)}
          >
            <SelectTrigger className="w-[180px] drop-shadow-none bg-white">
              <SelectValue placeholder="default date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">highest to lowest</SelectItem>
              <SelectItem value="createdAt">lowest to highest</SelectItem>
              <SelectItem value="default">default date</SelectItem>
            </SelectContent>
          </Select>{" "}
          <CustomButton
            onClick={() => setOpenFilter(!openFilter)}
            className="gap-3 ml-auto  flex items-center h-fit  !bg-transparent border-none !shadow-none"
          >
            Filter <TbFilter />
          </CustomButton>
        </div>
        <div className="overflow-hidden rounded-lg border shadow-sm border-neutral-200 bg-white">
          <table className="w-full  border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th>_Id</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Payment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sellers &&
                sellers.length > 0 &&
                sellers.map((seller: ISeller, i: number) => (
                  <>
                    <tr
                      key={seller._id}
                      className="text-center border border-b"
                    >
                      <td className="p-5 ">
                        <h1 className="m-auto w-[10ch] text-center truncate">
                          {seller._id}
                        </h1>
                      </td>
                      <td className="flex justify-center items-center">
                        <div
                          className="size-10 m-5 flex justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                         bg-blue-500 text-white"
                        >
                          {getInitials(seller.name)}
                        </div>
                      </td>
                      <td>{seller.name}</td>
                      <td>{seller.email}</td>
                      <td>{seller.sellerStatus}</td>
                      <td>{seller.payment}</td>
                      <td className="pr-5">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded"
                          onClick={() =>
                            setExpandedRowId(
                              expandedRowId === seller._id ? null : seller._id
                            )
                          }
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                    {expandedRowId === seller._id && (
                      <tr className="bg-slate-50">
                        <td colSpan={10} className="p-4 text-center">
                          <button
                            onClick={() => navigate(`${seller._id}`)}
                            className="px-3 py-2 bg-green-500 text-white rounded mr-2"
                          >
                            View
                          </button>
                          <button className="px-3 py-2 bg-red-500 text-white rounded mr-2">
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 flex justify-evenly items-center ">
          <div />
          <Pagination
            className="flex justify-center text-black"
            counter={counter}
            onLeftClick={handleLeft}
            onRightClick={handleRight}
          />
          <div className="gap-3 ml-auto flex">
            <select
              onChange={(e) => setPerPage(+e.target.value)}
              className="fs-16 bg-transparent"
            >
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
            <h1 className="text-sm">Per page</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSellers;
{
  /* <div className="flex flex-col basis-full gap-2 p-6  h-full ">
{sellers && sellers.length > 0 ? (
  sellers.map((seller: IUser) => (
    <div className=" p-5 flex flex-col shrink-0 rounded-md shadow-sm border border-gray-200 bg-white">
      <div key={seller?.name} className="relative gap-3  flex ">
        <div
          className="size-10 m-5 flex justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
         bg-blue-500 text-white"
        >
          {getInitials(seller.name)}
        </div>

        <div className="gap-3  flex flex-col justify-center">
          <h1 className="text-fs-16 font-bold">@{seller.name}</h1>
          <h1 className="text-fs-13 font-bold">{seller.email}</h1>
        </div>
        <div className=" ml-auto mr-5 gap-3 flex items-center">
          <CustomButton
            theme="black"
            className="h-10 flex items-center justify-center !rounded-xl"
            onClick={() => navigate(`${seller._id}`)}
          >
            view
          </CustomButton>
          {/* <CustomButton
            onClick={() => handleApplicantAcceptance(seller._id)}
            className=" "
          >
            delete
          </CustomButton> */
}
//         </div>
//       </div>
//       <div>
//         <h1 className="text-fs-13">{seller.description}</h1>
//       </div>
//     </div>
//   ))
// ) : (
//   <div className="flex justify-center">
//     <h1 className="text-gray-400">No sellers found</h1>
//   </div>
// )}
// </div> */}
