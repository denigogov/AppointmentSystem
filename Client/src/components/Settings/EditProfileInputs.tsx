import { useRef } from "react";
import "../../styling/Components/SettingsComponents/_editProfileInputs.scss";

import { AllUserTypes } from "../../types/tableApiTypes";

interface EditProfileProps {
  userInfoData: AllUserTypes[] | null | undefined;
  handlePutRequest: (queryData: AllUserTypes) => void;
}

const EditProfileInputs = ({
  userInfoData,
  handlePutRequest,
}: EditProfileProps) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const userInputs = Object.fromEntries(formData.entries());

    const takePassword = passwordRef.current?.value;

    const genderPasswordData = {
      gender: genderRef.current?.value,
      ...(takePassword && { password: takePassword }),
    };

    const userReadyData = { ...userInputs, ...genderPasswordData };
    handlePutRequest(userReadyData as AllUserTypes);
  };

  return (
    <div className="editProfileInputs__container">
      <p>
        Welcome back! We're here to help you keep your information up-to-date.
        Please review and make any necessary changes to your personal details
        below.
      </p>

      <form id="editProfileForm" onSubmit={handleUpdateUser}>
        <div className="editProfile__wrap-left">
          <label>First Name</label>
          <input
            ref={firstNameRef}
            name="firstName"
            type="text"
            placeholder="your name"
            defaultValue={userInfoData![0]?.firstName}
            pattern="^[A-Za-z0-9]{3,16}$"
          />

          <label>Last Name</label>
          <input
            ref={lastNameRef}
            name="lastName"
            type="text"
            placeholder="your last name"
            defaultValue={userInfoData![0]?.lastName}
            pattern="^[A-Za-z0-9]{3,16}$"
          />

          <label>{userInfoData![0].gender ? "Gender" : "City"}</label>

          {userInfoData![0]?.gender ? (
            <select ref={genderRef}>
              <option value={userInfoData![0]?.gender}>
                {userInfoData![0]?.gender}
              </option>
              <option
                value={userInfoData![0]?.gender === "Male" ? "Female" : "Male"}
              >
                {userInfoData![0]?.gender === "Male" ? "Female" : "Male"}
              </option>{" "}
              <option value="other">Other</option>
            </select>
          ) : (
            <input
              ref={cityRef}
              name="city"
              type="text"
              placeholder="your city"
              defaultValue={userInfoData![0]?.city}
              pattern="^[A-Za-z0-9 ]{3,16}$"
            />
          )}
        </div>
        <div className="editProfile__wrap-right">
          <label>Phone Number</label>
          <input
            ref={phoneNumberRef}
            name="phoneNumber"
            type="text"
            placeholder="your phone number"
            defaultValue={userInfoData![0]?.phoneNumber}
          />

          <label>Password</label>
          <input
            ref={passwordRef}
            type="text"
            placeholder="add your new password"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
          />

          <label>Email</label>
          <input
            ref={emailRef}
            name="email"
            type="text"
            placeholder="your email"
            defaultValue={userInfoData![0]?.email}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          />
        </div>
      </form>
      <button type="submit" form="editProfileForm">
        Save
      </button>
    </div>
  );
};

export default EditProfileInputs;
