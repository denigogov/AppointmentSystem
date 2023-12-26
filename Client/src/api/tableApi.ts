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
} from "../types/tableApiTypes";

const DEFAULT_URL: string = "http://localhost:4000/";

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

// Fetching ALL SERVICES !
export const fetchAllServices = async (token: TokenType | undefined) => {
  return apiFetcher<AllServicesTypes[]>(`tableRoute/services`, token || "");
};

// More info check serviceemployee Table !
export const fetchAllServiceEmployees = async (
  token: TokenType | undefined
) => {
  return apiFetcher<ServiceEmloyeesTypes>(
    `tableRoute/serviceemloyees`,
    token || ""
  );
};

// Fetching all customer Data !
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

// TIME MANAGMENT TABLE -- ALL values
export const fetchTimeManagment = async (token: TokenType | undefined) => {
  return apiFetcher<TimeManagmentTypes>(`employees/timeManagment`, token || "");
};

// ALL Appointmnets for the date picker I need in customer Appointmnet NewAppointmnet3
export const fetchAllAppointments = async (token: TokenType | undefined) => {
  return apiFetcher<AllAppointmentsTypes>(
    `tableRoute/appointment`,
    token || ""
  );
};

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
