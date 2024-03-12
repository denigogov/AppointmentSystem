import Swal from "sweetalert2";

// Error FN that I use in every request which don't have validation !
export const apiGeneralErrorHandle = (err: unknown) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    confirmButtonColor: "#ffda79",
    text: `${(err as Error).message}, please try again`,
  });
};
