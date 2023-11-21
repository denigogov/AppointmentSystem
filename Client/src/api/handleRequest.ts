import { ErrorSuccesMessage } from "../components/ErrorSuccesMessage";

const BASE_URL: string = "http://localhost:4000";

type SetterFn = React.Dispatch<React.SetStateAction<string>>;

export const handlePostPutDeleteRequest = async (
  method: string,
  token: any,
  succes: string,
  setSucces: SetterFn,
  setError: SetterFn,
  error: string,
  url: string,
  queryData: object | null
) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryData),
    });

    if (res.ok) {
      setSucces(`${succes}`);

      ErrorSuccesMessage(
        succes,
        error,
        "",
        "Customer with same email or Phone already exist"
      );
      setError("");
    } else {
      throw new Error();
    }
  } catch (err) {
    setError((err as Error).message);
  }
};
