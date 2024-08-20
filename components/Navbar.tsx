// Navbar.tsx
import React from 'react';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';

const NavbarComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const menuItems: string[] = [
    "Profile",
    "Leaderboard",
    "About Us",
    "Contact",
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-black text-white'>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link href="/">
          <Image src="/logo.png" alt="ACME" width={110} height={110} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" color='foreground'>
            Leaderboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="https://www.instagram.com/belbullets/">
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="https://www.strava.com/clubs/belbullets" target='_blank' rel='noopener noreferrer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" id="strava">
              <path fill="#F04F28" d="M15 30C6.717 30 0 23.283 0 15S6.717 0 15 0s15 6.717 15 15-6.717 15-15 15Z"></path>
              <path fill="#fff" d="M13.585 13.88l2.011 3.964h2.954L13.585 7.44l-4.97 9.404h2.953l2.017-3.964Z"></path>
              <path fill="#FFA780" d="M18.975 20.462l-1.496-2.95h-2.197l3.678 7.285 3.676-7.285h-2.195l-1.466 2.95Z"></path>
            </svg>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"

            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarComponent;
