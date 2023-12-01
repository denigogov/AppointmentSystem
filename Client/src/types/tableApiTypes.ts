export interface AllServicesTypes {
  id: number;
  servicesName: string;
  servicesPrice: string;
}

export interface ServiceEmloyeesTypes {
  services_id: number;
  employees_id: number;
  username: string;
}

export interface CustomerPersonalInfo {
  CustomerFirstName: string;
  CustomerLastName: string;
  customerEmail: string;
  customerPhone?: string;
  customerRegistration: string;
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
}

// Best Way  to set USESTATE as prop

// setAnyState: React.Dispatch<React.SetStateAction<TYPE>>

//  Add useState TYPE !
// const [selectedMenuItems, setSelectedMenuItems] = useState([] as MenuItem[]);
