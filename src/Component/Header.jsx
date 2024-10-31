import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const Header = () => {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <a href="/profile" className="flex items-center">
            <img src="/Logo.png" className="w-[25px]" />
            <p className="pl-1 text-sm font-bold text-inherit">SIMS PPOB</p>
          </a>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="top-up">
              Top Up
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="transaction">Transaction</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="account">
              Akun
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Header;
