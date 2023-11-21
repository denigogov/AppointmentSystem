export interface HandleRequestPropTypes {
  method: string;
  token: string;
  succes: string | null;
  setSucces: (value: React.SetStateAction<string>) => void;
  setError: (value: React.SetStateAction<string>) => void;
  url: string;
  queryData: object | null;
}
