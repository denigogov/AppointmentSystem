import Swal from "sweetalert2";

export const succesMessageBtn = (
  state: string,
  message: string,
  footer: string
) => {
  return Swal.fire({
    title: state,
    text: message,
    footer: footer,
    icon: "success",
    confirmButtonColor: "#fe9393",
  });
};

export const errorMessageBtn = (
  state: string,
  message: string,
  footer: string
) => {
  return Swal.fire({
    icon: "error",
    title: state,
    html: message,
    footer: footer,
    confirmButtonColor: "#da0404",
  });
};

export const succesMessageNoBtn = (title: string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
