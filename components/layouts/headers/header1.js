import { useState } from "react";
import Link from "next/link";

import {
  useMantineTheme,
  Header,
  Container,
  Group,
  Burger,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styled from "styled-components";

const HEADER_HEIGHT = 150;
const NAVBAR_HEIGHT = 50;

const categories = [
  { link: "/", label: "Home" },
  { link: "/luxury-destinations", label: "Luxury Destinations" },
  { link: "/fine-dining", label: "Fine Dining" },
  { link: "/luxury-brands", label: "Luxury Brands" },
  { link: "/luxury-in-media", label: "Luxury In Media" },
];

export default function Header1() {
  const [active, setActive] = useState(0);
  const [opened, { toggle }] = useDisclosure(false);

  const links = categories.map((item, index) => (
    <Item
      fz="md"
      component="a"
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
      active={active === index}
      px={15}
    >
      {item.label}
    </Item>
  ));

  return (
    <Header height={HEADER_HEIGHT}>
      <Wrapper>
        <Container>
          <Link href="/">
            <img
              src="https://welivelux.com/wp-content/themes/pupabc-wordpress-template/src/img/header-logo.png"
              alt="Home"
            />
          </Link>
          <Text c="dimmed">Sharing our passion for the luxury lifestyle.</Text>
        </Container>
        <NavbarWrapper>
          <Container>
            <Navbar spacing={0}>{links}</Navbar>
          </Container>
        </NavbarWrapper>
        {/* <Burger opened={opened} onClick={toggle} size="sm" /> */}
      </Wrapper>
    </Header>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & > div {
    width: 100%;
  }
`;

const NavbarWrapper = styled.div(() => {
  const theme = useMantineTheme();

  return `border-top: 2px solid ${theme.colors.gray[1]};`;
});

const Navbar = styled(Group)`
  height: ${NAVBAR_HEIGHT}px;
`;

const Item = styled(Text)(({ active }) => {
  const theme = useMantineTheme();

  return `line-height: ${NAVBAR_HEIGHT - 2}px;
  border-left: 1px solid ${theme.colors.gray[1]};
  border-bottom: 2px solid transparent;
  color: ${theme.colors.dark[5]};
  transition: box-shadow 300ms ease, color 300ms ease;
  ${active && "box-shadow: 0 2px 2px rgb(0 0 0 / 10%);"}
  &:last-child {
    border-right: 1px solid ${theme.colors.gray[1]};
  }
  &:hover {
    color: ${theme.primaryColor};
    box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
  }`;
});
