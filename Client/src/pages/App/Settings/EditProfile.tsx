import useSWR, { mutate } from "swr";
import { useAuth } from "../../../helpers/Auth";
import { fetchUserData } from "../../../api/tableApi";
import EditProfileInputs from "../../../components/Settings/EditProfileInputs";
import "../../../styling/Components/SettingsComponents/_editProfileInputs.scss";
import { AllUserTypes } from "../../../types/tableApiTypes";
import Swal from "sweetalert2";
import { apiGeneralErrorHandle } from "../../../helpers/api";
import { confirmUpdatePrompt } from "../../../components/ErrorSuccesMessage";
const API_URL = import.meta.env.VITE_API_URL as string;

const EditProfile = () => {
  const auth = useAuth();
  const { id, type } = auth.userInfo ?? {};
  const token = auth?.token;

  const {
    data: userInfoData,
    error: userInfoDataError,
    isLoading: userInfoDataLoading,
  } = useSWR(["userInfoData", token], () => fetchUserData({ id, type, token }));

  const handlePutRequest = async (queryData: AllUserTypes) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update User",
        "Are you sure you want to save the changes you made to your profile? This action will update your user information.",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        const res = await fetch(
          `${API_URL}/tableRoute/accounts/${id}/${type}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(queryData),
          }
        );

        if (res.ok) {
          mutate(["userInfoData", token]);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Edited!",
            text: "Your Updates has been saved.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const errorResponse = await res.json();

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errorResponse.validateUpdateUser[0].message}`,
          });
        }
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div className="editProfile__container">
      {/* <h5>{userInfoData![0]?.firstName}</h5> */}
      <h2>Edit Profile</h2>
      <EditProfileInputs
        userInfoDataError={userInfoDataError}
        userInfoDataLoading={userInfoDataLoading}
        userInfoData={userInfoData}
        handlePutRequest={handlePutRequest}
      />
    </div>
  );
};

export default EditProfile;
