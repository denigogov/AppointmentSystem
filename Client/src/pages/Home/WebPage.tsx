import svgIcon from "../../assets/loginInputIcon.svg";
import DashboardCardTop from "../../components/DashboardComponents/DashboardOwner/DashboardCardTop";
import "../../styling/_root.scss";

const WebPage = () => {
  return (
    <div className="componentTest">
      {/* <h1>here will be the web page!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        pariatur id tenetur cumque maiores odit distinctio atque sit amet
        deleniti voluptates, ea numquam dolorum ipsa fugit nostrum rerum illum!
        In doloremque quaerat atque magni dolorum minima eligendi deserunt
        architecto temporibus exercitationem tempore suscipit culpa, nostrum
        accusamus beatae eius rerum asperiores omnis! Ipsum quos facilis est
        repellat perferendis quas, nesciunt quisquam reprehenderit vel facere
        earum eum corporis ad doloribus, eveniet sequi mollitia voluptates iusto
        provident aliquid pariatur. Commodi modi numquam exercitationem dolore?
        Possimus iste illum impedit distinctio rerum dolorum reprehenderit,
        natus quod quo quae. Accusamus ipsum dolores aliquid quidem voluptatem
        modi.
      </p>

      <img src={svgIcon} alt="" /> */}

      <div className="dashboard__left--owner">
        <div className="dashboardLeft__cards--top">
          <DashboardCardTop
            title="Budget"
            value="€750.61"
            footer="lorem lorem lorem"
            hexColor="#da0404"
          />
          <DashboardCardTop
            title="Clients"
            value={60}
            footer="Clients total"
            hexColor="#e5d4ef"
          />
        </div>{" "}
        <div className="dashboardLeft__cards--top">
          <DashboardCardTop
            title="Budget"
            value="€750.61"
            footer="lorem lorem lorem"
            hexColor="#80b3ff"
          />
          <DashboardCardTop title="Clients" value={60} footer="Clients total" />
        </div>
      </div>
    </div>
  );
};

export default WebPage;
