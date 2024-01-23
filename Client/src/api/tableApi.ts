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
} from "../types/tableApiTypes";

const apiUrl = import.meta.env.VITE_API_URL as string;

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

export const fetchAllServices = async ({ token }: { token?: string }) => {
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
  token?: any;
}) => {
  return apiFetcher<CustomersDataTypes[]>(
    `tableRoute/customers/${id}/${type}`,
    token
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
export const fetchAllAppointments = async (token: TokenType | undefined) => {
  return apiFetcher<AllAppointmentsTypes>(
    `tableRoute/appointment`,
    token || ""
  );
};

/**
 * Fetching all user data !
 * @returns
 */
export const fetchUserData = async ({
  id,
  type,
  token,
}: {
  id?: number;
  type?: number;
  token?: any;
}) => {
  return apiFetcher<AllUserTypes[] | null>(
    `tableRoute/accounts/${id}/${type}`,
    token
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
