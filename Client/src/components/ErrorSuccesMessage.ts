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

export const errorMessageBtn = (state: string, message: string) => {
  return Swal.fire({
    icon: "error",
    title: state,
    html: message,
    footer: "please try one more time !",
    confirmButtonColor: "#da0404",
  });
};

export const succesMessageNoBtn = () => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
};
