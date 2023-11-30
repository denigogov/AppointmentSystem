import {
  AllServicesTypes,
  CustomersDataTypes,
  ServiceEmloyeesTypes,
} from "../types/tableApiTypes";

const DEFAULT_URL: string = "http://localhost:4000/";

export const apiFetcher = async <T>(url: string, token?: string) => {
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
    throw new Error("An error occurred while fetching the data");
  }
};

export const fetchAllServices = async () => {
  return apiFetcher<AllServicesTypes>(`tableRoute/services`);
};
export const fetchAllServiceEmployees = async () => {
  return apiFetcher<ServiceEmloyeesTypes>(`tableRoute/serviceemloyees`);
};

export const fetchCustomerData = async ({
  id,
  type,
  token,
}: {
  id?: number;
  type?: number;
  token?: any;
}) => {
  return apiFetcher<CustomersDataTypes[] | null>(
    `tableRoute/customers/${id}/${type}`,
    token
  );
};
