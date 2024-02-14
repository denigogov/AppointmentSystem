import useSWRInfinite from "swr/infinite";
import { useAuth } from "../../../helpers/Auth";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingRing from "../../loadingRing";
import { FetchCustomersLimitProps } from "../../../types/tableApiTypes";
import moreDetailsIcon from "../../../assets/customerMoreDetailsIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { dataMonthShow } from "../../../helpers/Dates";
import { fetchCustomersLimit } from "../../../api/tableApi";
import { apiGeneralErrorHandle } from "../../../helpers/api";

interface CustomerTableViewProps {
  handleDeleteCustomer: (e: FetchCustomersLimitProps) => void;
  handlePopUp: (e: number) => void;
}

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE as string;

const CustomerTableView: React.FC<CustomerTableViewProps> = ({
  handleDeleteCustomer,
  handlePopUp,
}) => {
  const { token } = useAuth();

  const fetcher = async (url: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${token ?? ""}`,
      };
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(
    fetchCustomersLimit,
    fetcher,
    { refreshInterval: 4000 } // Refreshing data every 4 secounds because of the delete btn ... mutate hook is not working inside of the event Handler because of the nature of useSWRInfinity (probably)
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const isEmpty = data?.[0]?.length === 0;
  const loadData = data ? [].concat(...data) : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  // Load more data when component is in view
  useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isLoadingMore, isReachingEnd, setSize, size]);

  const submitDeleteCustomer = (e: FetchCustomersLimitProps) => {
    handleDeleteCustomer(e);
  };

  const handleDetails = (id: number) => {
    handlePopUp(id);
  };

  return (
    // styling inside of the main container -- customerRoot
    <div className="customerTableView--container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Gender</th>
            <th>Created At</th>
            <th>Confirmed</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loadData?.map((data: FetchCustomersLimitProps, i) => {
            return (
              <tr ref={ref} key={i}>
                <td data-cell="#">{i + 1}</td>
                <td data-cell="Name">
                  {data?.firstName ?? "Not Found"} {data?.lastName}
                </td>
                <td data-cell="Email">{data?.email ?? "Not Found"}</td>
                <td data-cell="PhoneNumber">
                  {data?.phoneNumber ?? "Not Found"}
                </td>
                <td data-cell="Gender">{data?.gender ?? "Not Found"}</td>
                <td data-cell="Created At">
                  {dataMonthShow(data?.created_at ?? "Not Found")}
                </td>
                <td data-cell="Confirmed">
                  {data?.confirmation === 1 ? "Yes" : "No"}
                </td>

                <td data-cell="Details">
                  <img
                    src={moreDetailsIcon}
                    alt="Details Icon"
                    onClick={() => handleDetails(data?.id)}
                  />
                </td>
                <td data-cell="Delete">
                  <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    onClick={() => submitDeleteCustomer(data)}
                  />
                </td>
              </tr>
            );
          })}
          {!isReachingEnd ? (
            <tr>
              <td data-cell="Status" colSpan={8}>
                <LoadingRing />
              </td>
            </tr>
          ) : (
            <tr>
              <td data-cell="Status" colSpan={8}>
                Table is fully loaded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTableView;
