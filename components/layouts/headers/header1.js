import { useRouter } from "next/router";
import Link from "next/link";

import { Header, Container, Group, Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styled from "@emotion/styled";

const HEADER_HEIGHT = 150;
const NAVBAR_HEIGHT = 50;

export default function Header1({ categories }) {
  const { asPath } = useRouter();
  const [opened, { toggle }] = useDisclosure(false);

  const links = categories.map(
    (item) =>
      item.slug !== "uncategorized" && (
        <Item
          fz="md"
          component={Link}
          href={"/category/" + item.slug}
          key={item.id}
          active={asPath.includes(item.slug)}
          px={15}
        >
          {item.name}
        </Item>
      )
  );

  return (
    <Header height={HEADER_HEIGHT}>
      <Wrapper>
        <LogoContainer>
          <Link href="/">
            <img
              src="https://welivelux.com/wp-content/themes/pupabc-wordpress-template/src/img/header-logo.png"
              alt="Home"
            />
          </Link>
          <Text c="dimmed" mt={4}>
            Sharing our passion for the luxury lifestyle.
          </Text>
        </LogoContainer>
        <NavbarWrapper>
          <Container>
            <Navbar spacing={0}>{links}</Navbar>
          </Container>
        </NavbarWrapper>
        <BurgerMenu opened={opened} onClick={toggle} size="lg" mr={16} />
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

  ${({ theme }) => `
  ${theme.fn.smallerThan("sm")} {
    flex-direction: row;
    align-items: center;
  }
`};
`;

const LogoContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & img {
    max-width: 100%;
  }
`;

const NavbarWrapper = styled.div`
  ${({ theme }) => `
    border-top: 2px solid ${theme.colors.gray[1]};
    ${theme.fn.smallerThan("sm")} {
      display: none;
    }
  `};
`;

const Navbar = styled(Group)`
  height: ${NAVBAR_HEIGHT}px;
`;

const Item = styled(Text)`
  ${({ theme }) =>
    `line-height: ${NAVBAR_HEIGHT - 2}px;
    border-left: 1px solid ${theme.colors.gray[1]};
    border-bottom: 2px solid transparent;
    color: ${theme.colors.dark[5]};
    transition: box-shadow 300ms ease, color 300ms ease;
    &:last-child {
      border-right: 1px solid ${theme.colors.gray[1]};
    }
    &:hover {
      color: ${theme.primaryColor};
      box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    }`}

  ${({ active }) => active && `box-shadow: 0 2px 2px rgb(0 0 0 / 10%);`}
`;

const BurgerMenu = styled(Burger)`
  ${({ theme }) => `${theme.fn.largerThan("sm")} {
    display: none;
  }`}
`;
