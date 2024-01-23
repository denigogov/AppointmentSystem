import Swal from "sweetalert2";

export const apiGeneralErrorHandle = (err: unknown) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    confirmButtonColor: "#ffda79",
    text: `${(err as Error).message}, please try again`,
  });
};
