import "../styling/_errorPage.scss";

const ErrorPage = () => {
  return (
    <div className="errorContainer">
      <h1>404</h1>
      <div>
        <h3>page not found</h3>
        <a href="/">home</a>
      </div>
    </div>
  );
};

export default ErrorPage;
