import { TokenType } from "../types/AuthTypes";
import {
  AllAppointmentsTypes,
  AllServicesTypes,
  CustomersDataTypes,
  ServiceEmloyeesTypes,
  TimeManagmentTypes,
  AllUserTypes,
  allAppointmentsByDataRangeAndEmployTypes,
  fetchServiceProcentCurrentMonthTypes,
  FetchAppointmentsByHourRangeTypes,
  FetchAppointmentsByDayAndTotalTypes,
  FetchAppointmentsTotalTypes,
  FetchTop5CustomersTypes,
  FetchAllEmployeesTypes,
  FetchTotalMoneyAppServiceProps,
  FetchDataByServiceProps,
  FetchServiceByMonthProps,
  FetchCustomersLimitProps,
  FetchUserTypesProps,
} from "../types/tableApiTypes";

const apiUrl = import.meta.env.VITE_API_URL as string;
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE as string;
const DEFAULT_URL: string = `${apiUrl}/`;

/**
 *
 * @param url
 * @param token
 * @returns data
 */

export const apiFetcher = async <T>(url: string, token: string) => {
  try {
    const res = await fetch(`${DEFAULT_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res);

    if (!res.ok) {
      throw new Error("API request failed");
    }
    const data = await res.json();

    return data as T;
  } catch (err) {
    console.error(err as Error);
    throw new Error("An error occurred while fetching the data");
  }
};

/**
 * Fetching ALL SERVICES
 * @returns all aproved and unemproved services !
 */

export const fetchAllServices = async (token?: string) => {
  return apiFetcher<AllServicesTypes[]>(`tableRoute/services`, token || "");
};

/**
 * @async
 * @param token {string}
 * @param id {number} optional
 */
// BUG
export const fetchAllServiceEmployees = async (
  token: TokenType | undefined,
  id?: number
) => {
  return apiFetcher<ServiceEmloyeesTypes[]>(
    `tableRoute/serviceemloyees/${id ? id : ""}`,
    token ?? ""
  );
};

/**
 * TIME MANAGMENT TABLE -- ALL values
 * @returns
 */
export const fetchTimeManagment = async ({
  token,
  userId,
}: {
  token?: TokenType;
  userId?: number;
}) => {
  return apiFetcher<TimeManagmentTypes[]>(
    `employees/timeManagment/${userId ? userId : ""}`,
    token ?? ""
  );
};

/**
 * ALL Appointmnets for the date picker I need in customer Appointmnet NewAppointmnet3
 * @returns
 */
export const fetchAllAppointmentsFromTodayOn = async (
  token: TokenType | undefined
) => {
  return apiFetcher<AllAppointmentsTypes>(
    `tableRoute/appointment`,
    token || ""
  );
};

/**
 *  Fetching all customer Data !
 * @returns
 */
export const fetchCustomerData = async ({
  id,
  type,
  token,
}: {
  id?: number | string; // I add string because useParam return type string! I try also to translate but not work
  type?: number;
  token?: string;
}) => {
  return apiFetcher<CustomersDataTypes[]>(
    `tableRoute/customers/${id}/${type}`,
    token ?? ""
  );
};

/**
 * Fetching user Data for all type -- Edit User api
 * @returns
 */
export const fetchUserData = async ({
  id,
  type,
  token,
}: {
  id?: number;
  type?: number;
  token?: string;
}) => {
  return apiFetcher<AllUserTypes[] | null>(
    `tableRoute/accounts/${id}/${type}`,
    token ?? ""
  );
};

/**
 *
 * Fething all Appointmnets by Data range Default date Today
 * @returns
 */
export const fetchAllAppointmentsDataRange = async ({
  id,
  token,
  startDateSelected,
  endDateSelected,
}: {
  id?: number;
  token?: string;
  startDateSelected?: string | Date;
  endDateSelected?: string | Date;
}) => {
  return apiFetcher<allAppointmentsByDataRangeAndEmployTypes[]>(
    `employees/appointmentRange/${id}?startDate=${startDateSelected}&endDate=${endDateSelected}`,
    token ?? ""
  );
};

/**
 * Fetching Data for every service in % how many appointmnets for current Month
 * @param id - optional

 */
export const fetchServiceProcentCurrentMonth = async ({
  token,
  id,
}: {
  id?: number;
  token?: string;
}) => {
  return apiFetcher<fetchServiceProcentCurrentMonthTypes[]>(
    `employees/serviceStatistic/${id ? id : ""}`,
    token ?? ""
  );
};

/**
 *fetching all appointmnet by hour also user can create data range !, optional id ,start and end Date
 * @param  token token
 * @param id employee id Optional Data
 * @param startDateAndHour optional start Date
 * @param endDateAndHour optional end Date
 * @returns
 */
export const fetchAppointmentsByHourRange = async ({
  token,
  id,
  startDateAndHour,
  endDateAndHour,
}: {
  id?: number;
  token?: string;
  startDateAndHour?: string | Date;
  endDateAndHour?: string | Date;
}) => {
  return apiFetcher<FetchAppointmentsByHourRangeTypes[]>(
    `employees/appointmentsByHourRange/${id ? id : ""}${
      startDateAndHour && endDateAndHour
        ? `?startDate=${startDateAndHour}&endDate=${endDateAndHour}`
        : ""
    }`,
    token ?? ""
  );
};

/**
 * Fetching all appointmnets by every weeekday for current month and for hole year
 * @param id - optional
 * @returns
 */
export const fetchAppointmentsByDayAndTotal = async ({
  token,
  id,
}: {
  id?: number;
  token?: string;
}) => {
  return apiFetcher<FetchAppointmentsByDayAndTotalTypes[]>(
    `employees/appointmentByDay/${id ? id : ""}`,
    token ?? ""
  );
};

/**
 * Count Appointmnets By Total, Year and Month
 * @param id - optional
 * @returns
 */
export const fetchAppointmentsTotal = async ({
  token,
  id,
}: {
  id?: number;
  token?: string;
}) => {
  return apiFetcher<FetchAppointmentsTotalTypes[]>(
    `employees/appointmentsTotal/${id ? id : ""}`,
    token ?? ""
  );
};

/**
 * Count Appointmnets By Total, Year and Month
 * @returns top 5 customers by most appointments
 */
export const fetchTop5Customers = async (token: string) => {
  return apiFetcher<FetchTop5CustomersTypes[]>(
    `tableRoute/customersTop5`,
    token ?? ""
  );
};

// Fetch all Employees
export const fetchAllEmployees = async (token: string) => {
  return apiFetcher<FetchAllEmployeesTypes[]>(`employees/`, token ?? "");
};

// THEY ARE THE SAME BUT ONE IS FETCHING SINGLE EMPLOYER ANOTHER ONE ALL EMPLOYEERS ...THE PROBLEM IS IN THE BACKEND I NEED TO FIX when I add param in the root the another api are brake thats why I add separte till I found solution

/**
 * @param employerId Optional!
 * @param token
 * @returns Fetch all Employees also single Employer
 */
export const fetchSingleEmployees = async (
  token: string,
  employerId?: string
) => {
  return apiFetcher<FetchAllEmployeesTypes[]>(
    `employees/singleEmployer/${employerId ? employerId : ""}`,
    token ?? ""
  );
};

/**
 *
 * @param startDate optional
 * @param startDate optional
 * @returns Total Money, Top Service, Total Appointments by default is current month
 */
export const fetchTotalMoneyAppService = async ({
  token,
  formatStartDate,
  formatEndDate,
}: {
  token?: string;
  formatStartDate?: Date | string | null;
  formatEndDate?: Date | string | null;
}) => {
  return apiFetcher<FetchTotalMoneyAppServiceProps[]>(
    `employees/totalMoneyAppService/${
      formatStartDate && formatEndDate
        ? `?startDate=${formatStartDate}&endDate=${formatEndDate}`
        : ""
    }`,
    token ?? ""
  );
};

/**
 *
 * @returns  data: Total Money ,Best Employer Total Appointment by service
 */
export const fetchDataByService = async (token: string) => {
  return apiFetcher<FetchDataByServiceProps[]>(
    `employees/dataByService`,
    token ?? ""
  );
};

/**
 *
 * @param ServiceName -- optional
 * @returns Total Money By Month and Year for each service By Default is no ServiceName return for all total
 */
export const fetchServiceByMonth = async ({
  token,
  selectedServiceChart,
}: {
  selectedServiceChart?: string;
  token?: string;
}) => {
  return apiFetcher<FetchServiceByMonthProps[]>(
    `employees/serviceByMonth/?services=${
      selectedServiceChart ? selectedServiceChart : ""
    }`,
    token ?? ""
  );
};

// Infinity Scroll Limited Data for Showing all Customers
/**
 *
 * @param pageIndex number of the page by default I made it to 1
 * @param previousPageData  by default is this there is the previouse data already loaded!
 * @returns inifinity scroll by default set 15 data to read
 */
export const fetchCustomersLimit = (
  pageIndex: number,
  previousPageData: FetchCustomersLimitProps[] | null
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${apiUrl}/tableRoute/customers-limit/?page=${
    pageIndex + 1
  }&limit=${PAGE_SIZE}`; // SWR key
};

/**
 *
 * @param token
 * @returns Return All userTypes not employees types !
 */
export const fetchUserTypes = async (token?: string) => {
  return apiFetcher<FetchUserTypesProps[]>(`tableRoute/userTypes`, token ?? "");
};
