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
    iconColor: "#ffda79",
    title: "Created!",
    text: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

// General Delete Message Propt Confirm
export const confirmDeletePrompt = (title: string, htmlText: string) =>
  Swal.fire({
    title: title,
    html: htmlText,
    icon: "warning",
    showCancelButton: true,
    iconColor: "#da0404",
    confirmButtonColor: "#da0404",
    cancelButtonColor: "#b7b7b7",
    confirmButtonText: "Confirm !",
  });

// When Delete Confirm is true !
export const deleteActionPrompt = () =>
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "#da0404",
    title: "Deleted!",
    showConfirmButton: false,
    timer: 1500,
  });
