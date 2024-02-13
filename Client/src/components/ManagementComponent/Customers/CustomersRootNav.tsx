import "../../../styling/Components/management components/_customerRootNavBar.scss";

interface CustomersRootNavProps {
  /* props types */
}

const CustomersRootNav: React.FC<CustomersRootNavProps> = (
  {
    /* props */
  }
) => {
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
