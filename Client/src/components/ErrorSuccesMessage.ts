import Swal from "sweetalert2";

/**
 *
 * @param state  title of the message
 * @param message main message
 * @param footer footer
 * @returns alert with button
 */
export const succesMessageBtn = (
  state: string,
  message: string,
  footer?: string,
  iconType: any = "success"
) => {
  return Swal.fire({
    title: state,
    html: message,
    footer: footer,
    position: "center",
    icon: iconType,
    iconColor: "#ffda79",
    confirmButtonColor: "#ffda79",
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

// for created !
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
export const deleteActionPrompt = (title?: string) =>
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "#da0404",
    title: !title ? "Deleted!" : title,
    showConfirmButton: false,
    timer: 1500,
  });

/**
 *
 * @param title string
 * @param htmlText string | also can be added HTML tags example: `${<strong>text</strong>}`
 * @param confirmBtnText string | btn name
 * @returns
 */
export const confirmUpdatePrompt = (
  title: string,
  htmlText: string,
  confirmBtnText: string
) =>
  Swal.fire({
    title: title,
    html: htmlText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffda79",
    cancelButtonColor: "#b7b7b7",
    confirmButtonText: confirmBtnText,
  });

/**
 *
 * @param title string
 * @param htmlText string | also can be added HTML tags example: `${<strong>text</strong>}`
 */
export const updateActionPrompt = (title: string, htmlText: string) => {
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "#ffda79",
    title: title,
    text: htmlText,
    showConfirmButton: false,
    timer: 2000,
  });
};
