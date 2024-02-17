import "../styling/_progressBar.scss";

const ProgressBar = ({ currentStepIndex }: { currentStepIndex: number }) => {
  return (
    <div>
      <section className="step-wizard">
        <ul className="step-wizard-list">
          <li
            className={
              currentStepIndex === 0
                ? "step-wizard-item  active"
                : "step-wizard-item"
            }
          >
            <span className="progress-count">1</span>
            <span className="progress-label">Employer Info</span>
          </li>
          <li
            className={
              currentStepIndex === 1
                ? "step-wizard-item  active"
                : "step-wizard-item"
            }
          >
            <span className="progress-count">2</span>
            <span className="progress-label">Work Time</span>
          </li>
          <li
            className={
              currentStepIndex === 2
                ? "step-wizard-item  active"
                : "step-wizard-item"
            }
          >
            <span className="progress-count">3</span>
            <span className="progress-label">Authorisation</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ProgressBar;
