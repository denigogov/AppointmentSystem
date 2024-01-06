import useSWR, { mutate } from "swr";
import { useAuth } from "../../../helpers/Auth";
import { fetchUserData } from "../../../api/tableApi";
import EditProfileInputs from "../../../components/Settings/EditProfileInputs";
import "../../../styling/Components/SettingsComponents/_editProfileInputs.scss";
import { AllUserTypes } from "../../../types/tableApiTypes";
import Swal from "sweetalert2";

const EditProfile = () => {
  const auth = useAuth();
  const { id, type } = auth.userInfo ?? {};
  const token = auth?.token;

  const {
    data: userInfoData,
    error: userInfoDataError,
    isLoading: userInfoDataLoading,
  } = useSWR(["userInfoData", token], () => fetchUserData({ id, type, token }));

  if (userInfoDataError) return <h6>{userInfoDataError.message}</h6>;
  if (userInfoDataLoading) return <p>loading...</p>;

  const handlePutRequest = async (queryData: AllUserTypes) => {
    try {
      const sendMessage = Swal.fire({
        title: "Update User",
        text: "Are you sure you want to save the changes you made to your profile? This action will update your user information.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ffda79    ",
        cancelButtonColor: "#b7b7b7",
        confirmButtonText: "Yes, delete it!",
      });

      if ((await sendMessage).isConfirmed) {
        const res = await fetch(
          `http://localhost:4000/tableRoute/accounts/${id}/${type}`,
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again !!",
      });
    }
  };

  return (
    <div className="editProfile__container">
      {/* <h5>{userInfoData![0]?.firstName}</h5> */}
      <h2>Edit Profile</h2>
      <EditProfileInputs
        userInfoData={userInfoData}
        handlePutRequest={handlePutRequest}
      />
    </div>
  );
};

export default EditProfile;
