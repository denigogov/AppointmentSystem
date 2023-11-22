// import Swal from "sweetalert2";
import Swal from "sweetalert2";
import { errorMessageBtn } from "../components/ErrorSuccesMessage";

const BASE_URL: string = "http://localhost:4000";

type SetterFn = React.Dispatch<React.SetStateAction<string>>;

// TESTING !!

export const postDeletePutRequest = async (
  method: string,
  token: string,
  url: string,
  queryValue: object,
  setError: SetterFn,
  errorMessage: string,
  errorPersonalMessageTitle: string,
  errorPersonalMessageText: string,
  setSuccess: SetterFn,
  successMessage: string,
  successTitle: string,
  succesText: string,
  navigate: any
) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryValue),
    });

    if (res.ok) {
      setError("");
      setSuccess(`${successMessage}`);

      Swal.fire({
        icon: "success",
        title: `${successTitle}`,
        html: `${succesText}`,

        confirmButtonColor: "#fe9393",
      }).then((res) => {
        if (res.isConfirmed || res.isDismissed) navigate;
      });
    } else {
      const errorResponse = await res.json();

      setError(errorResponse.validateCustomer[0].message);
      throw new Error(errorResponse.validateCustomer[0].message);
    }
  } catch (err) {
    setError((err as Error).message);

    {
      errorMessage &&
        errorMessageBtn(
          errorMessage?.includes("Duplicate")
            ? `${errorPersonalMessageTitle}`
            : errorMessage,
          `${errorPersonalMessageText}`
        );
    }
  }
};
