interface ServiceSelectViewProp {
  selectedService: string[];
  postSelectedServices: () => Promise<void>;
}

const ServiceSelectView = ({
  selectedService,
  postSelectedServices,
}: ServiceSelectViewProp) => {
  // const vane = selectedService.length
  //   ? selectedService.reduce((acc, mov) => ({ ...acc, [mov]: mov }), {})
  //   : [];

  // console.log(vane);

  const handleNewService = () => {
    postSelectedServices();
  };

  return (
    // Styling for className  "serviceSelectView__container" is inside of _serviceApprovedView
    <div className="serviceSelectView__container">
      <div className="serviceRequest__header--text">
        <p>Selected Services</p>
        <p>
          Services you've chosen are ready for approval. Confirm your
          selections, and once approved, experience the added benefits in your
          daily work routine
        </p>
      </div>

      <div>
        {selectedService.map((service, i) => (
          <ul key={i}>
            <li className="selectedService--addedItem">{service}</li>
          </ul>
        ))}
      </div>

      {/* if user add some services than will show the btn save and remove add service  */}

      {selectedService.length ? (
        <button className="addServiceBtn" onClick={handleNewService}>
          <span>Save</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ServiceSelectView;
