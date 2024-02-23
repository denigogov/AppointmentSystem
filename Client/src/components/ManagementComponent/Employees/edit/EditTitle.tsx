interface EditTitleProps {}

const EditTitle: React.FC<EditTitleProps> = ({}) => {
  return (
    // Styling inside of editEmployer.scss
    <div className="editEmployer__title--container">
      <h2>Edit Profile</h2>
      <p>
        Welcome back! We're here to help you keep your information up-to-date.
        Please review and make any necessary changes to your personal details
        below.
      </p>
    </div>
  );
};

export default EditTitle;
