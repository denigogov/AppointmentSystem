const UnderConstruction = ({ titleText }: { titleText: string }) => {
  return (
    <div className="underConstructiont--container">
      <div className="warning-content">
        <h1>New {titleText} Under Construction</h1>
        {/* <img src={underConstructionSvg} alt="underConstruction svg" /> */}
        {/* I need to find new svg animation  "Settings Cog svg " */}
        <p>
          Please forgive the inconvenience. <br />
          We are currently initializing our brand new {titleText}.
        </p>
        <p>It's okay, we're excited too!</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
