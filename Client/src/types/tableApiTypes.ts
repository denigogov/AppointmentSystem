import { string } from "joi";

export interface AllServicesTypes {
  id: number;
  servicesName: string;
  servicesPrice: string;
}

export interface ServiceEmloyeesTypes {
  services_id: number;
  employees_id: number;
  firstName: string;
  lastName: string;
}

export interface CustomerPersonalInfo {
  CustomerFirstName: string;
  CustomerLastName: string;
  customerEmail: string;
  customerPhone?: string;
  customerRegistration: string;
  gender: string;
}

export interface CustomerDataBoxType {
  totalAppointments: number;
  totalAmount: number;
}

export interface CustomerUpcomingEventType {
  scheduled_at?: string;
  servicesName?: string;
  EmployeeFirstName?: string;
  EmployeeLastName?: string;
  daysLeft?: number | null | undefined;
}

export interface CustomersDataTypes
  extends CustomerPersonalInfo,
    CustomerUpcomingEventType {
  servicePrice?: number;
  created_at?: string;
  appointmentId: number;
  employeeId: number;
}

// Time Managment TYPES

export interface TimeManagmentTypes {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  startHour: number | null;
  endHour: number | null;
  startMinute: number | null;
  endMinute: number | null;
  timeInterval: number | null;
  employee_id: number | null;
}

export interface AllAppointmentsTypes {
  id: number;
  customer_id: number | null;
  employee_id: number | null;
  service_id: number;
  created_at: Date;
  scheduled_at: Date | string;
}

export interface AllUserTypes {
  id: number;
  userType_id: number;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phoneNumber?: string;
  password: string;
  gender?: string;
}

// Best Way  to set USESTATE as prop
// setAnyState: React.Dispatch<React.SetStateAction<TYPE>>
//  Add useState TYPE !
// const [selectedMenuItems, setSelectedMenuItems] = useState([] as MenuItem[]);
