import "../../../styling/Components/management components/_customerRootNavBar.scss";

const CustomersRootNav: React.FC = () => {
  return (
    <div className="customerRoot--navBar">
      <nav>
        <ul>
          <li>
            <input type="search" placeholder="some filter" />
          </li>

          <li>
            <input type="search" placeholder="maybe checkbox" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomersRootNav;
