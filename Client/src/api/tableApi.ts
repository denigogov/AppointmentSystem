import { AllServicesTypes, ServiceEmloyeesTypes } from "../types/tableApiTypes";

const DEFAULT_URL: string = "http://localhost:4000/";

export const apiFetcher = async <T>(url: string) => {
  try {
    const res = await fetch(`${DEFAULT_URL}${url}`);

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
