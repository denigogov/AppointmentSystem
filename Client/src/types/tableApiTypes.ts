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

export interface CustomersDataTypes extends CustomerPersonalInfo {
  EmployeeFirstName?: string;
  EmployeeLastName?: string;
  created_at?: string;
  scheduled_at?: string;
  servicePrice?: string;
  servicesName?: string;
}

// Best Way  to set USESTATE as prop

// setAnyState: React.Dispatch<React.SetStateAction<TYPE>>

//  Add useState TYPE !
// const [selectedMenuItems, setSelectedMenuItems] = useState([] as MenuItem[]);
