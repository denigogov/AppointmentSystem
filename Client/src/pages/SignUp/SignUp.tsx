import { fetchAllServices } from "../../api/tableApi";
import SignUpForm from "../../components/signUpComponent/SignUpForm";
import useSWR from "swr";
import { AllServicesTypes } from "../../types/tableApiTypes";

const SignUp = () => {
  const {
    data: allServices,
    error: allServicesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[] | any>("orderStatus", () => fetchAllServices());

  if (allServicesError) return <h6>error</h6>;
  if (allServicesLoading) return <h1>loading</h1>;

  console.log(allServices);

  return (
    <div>
      <h4>Create new Account</h4>

      <SignUpForm allServices={allServices} />
    </div>
  );
};

export default SignUp;
