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

// Best Way  to set USESTATE as prop

// setAnyState: React.Dispatch<React.SetStateAction<TYPE>>

//  Add useState TYPE !
// const [selectedMenuItems, setSelectedMenuItems] = useState([] as MenuItem[]);
