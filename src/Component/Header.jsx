import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const match = (item) => {
    if (location.pathname === item.path) return true;
    else return false;
  };
  const navItem = [
    { path: "/top-up", linkName: "Top UP" },
    { path: "/transaction", linkName: "Transaction" },
    { path: "/account", linkName: "Akun" },
  ];
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link to="/profile" className="flex items-center">
            <img src="/Logo.png" className="w-[25px]" />
            <p className="pl-1 text-sm font-bold text-inherit">SIMS PPOB</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItem.map((item, index) => {
            return (
              <NavbarItem key={index} isActive={match(item)}>
                <Link
                  className={` font-roboto ${
                    match(item) ? "text-red-500 font-bold" : "text-inherit"
                  }`}
                  color="foreground"
                  to={item.path}
                >
                  {item.linkName}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Header;
