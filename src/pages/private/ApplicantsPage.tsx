import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/shared/Pagination";
import { CiSearch } from "react-icons/ci";
import useSetTimeout from "@/hooks/useSetTimeout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISeller, IUser } from "@/types/types";
import useSellersPagination from "@/hooks/useSellerPagination";
import { errorToast, getInitials, successToast } from "@/lib/utils";
import {
  useAcceptApplicantMutation,
  useRejectApplicantMutation,
} from "@/store/apiSlices/userSlice";
import Loader from "@/components/Loaders/Loader";
import dateFormatter from "@/lib/helpers/dateFormatter";

function ApplicantsPage() {
  const [acceptApplicantMutation, { isLoading: isAcceptLoading }] =
    useAcceptApplicantMutation();
  const [rejectApplicantMutation, { isLoading: isRejectLoading }] =
    useRejectApplicantMutation();

  const [name, setSearchName] = useState("");
  const [perPage, setPerPage] = useState(8);
  const [sort, setSort] = useState<any>([]);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const { sellers, counter, handleLeft, handleRight, refetchUsers } =
    useSellersPagination({
      name,
      sellerStatus: "pending",
      roles: "seller",
      perPage,
      sort,
    });
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const { timeouter } = useSetTimeout();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    console.log(value);
    timeouter(() => {
      setSearchName(value);
    }, 2000);
  };

  const handleSortChange = (name: string, value: string) => {
    setSort((prevSort: string[]) => {
      let updatedSort = prevSort.filter((key) => !key.includes(name));
      if (value !== "default") {
        updatedSort = [value, ...updatedSort];
      }
      return updatedSort;
    });
  };
  const handleApplicantAcceptance = async (userId: string) => {
    try {
      const response = await acceptApplicantMutation({ userId }).unwrap();
      successToast(response);
      refetchUsers();
    } catch (error) {
      errorToast(error);
    }
  };
  const handleApplicantRejection = async (userId: string) => {
    try {
      const response = await rejectApplicantMutation({ userId }).unwrap();
      successToast(response);
      refetchUsers();
    } catch (error) {
      errorToast(error);
    }
  };
  return (
    <>
      <div className="relative p-6  flex flex-col grow">
        {(isAcceptLoading || isRejectLoading) && <Loader />}
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
        </div>

        <div className="relative fs-20 py-6 gap-3 flex items-center    ">
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
          </Select>
        </div>
        <div className="overflow-hidden rounded-lg border shadow-sm border-neutral-200 bg-white">
          <table className="w-full  border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th>_Id</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
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
                      <td>{dateFormatter(seller.createdAt, "day")}</td>

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
                            onClick={() =>
                              handleApplicantAcceptance(seller._id)
                            }
                            className="px-3 py-2 bg-green-500 text-white rounded mr-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleApplicantRejection(seller._id)}
                            className="px-3 py-2 bg-red-500 text-white rounded mr-2"
                          >
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
        {/* <div className="flex flex-col basis-full gap-2 p-6  h-full ">
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
                      onClick={() => handleApplicantAcceptance(seller._id)}
                    >
                      reject
                    </CustomButton>
                    <CustomButton
                      onClick={() => handleApplicantRejection(seller._id)}
                      className=" "
                    >
                      confirm
                    </CustomButton>
                  </div>
                </div>
                <div>
                  <h1 className="text-fs-13">{seller.description}</h1>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <h1 className="text-gray-400">No applicants found</h1>
            </div>
          )}
        </div> */}

        <div id="foot" className="p-6 flex justify-between items-center w-full">
          <div />
          <Pagination
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
            <h1 className="text-nowrap font-semibold c3">Per page</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicantsPage;
