import { useRouter } from "next/router";
import Link from "next/link";

import { Header, Container, Group, Burger, Text, Drawer, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styled from "@emotion/styled";

export default function Header1({ categories }) {
  const { asPath } = useRouter();
  const [opened, { toggle }] = useDisclosure(false);

  const links = categories
    ? categories.map(
        (item) =>
          item.slug !== "uncategorized" && (
            <Item fz="md" component={Link} href={{ pathname: "/category/[slug]", query: { slug: item.slug } }} key={item.id} active={asPath.includes(item.slug)} px={15}>
              {item.name}
            </Item>
          )
      )
    : [];

  return (
    <>
      <Header>
        <Wrapper>
          <LogoContainer>
            <Link href="/">
              <img src="/logo.webp" alt="Home" />
            </Link>
            <Text c="dimmed" mt={4}>
              Sharing our passion for the luxury lifestyle.
            </Text>
          </LogoContainer>
          {links.length > 0 && (
            <>
              <Navbar>
                <Container>
                  <Group spacing={0}>{links}</Group>
                </Container>
              </Navbar>
              <BurgerMenu opened={opened} onClick={toggle} size="md" mr={16} />
            </>
          )}
        </Wrapper>
      </Header>

      <Drawer opened={opened} onClose={toggle} size="100%" padding="md" title="Navigation" zIndex={1000000}>
        <Divider />
        <DrawerBody>{links}</DrawerBody>
      </Drawer>
    </>
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
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & img {
    max-width: 100%;
  }
`;

const Navbar = styled.div`
  ${({ theme }) => `
    border-top: 2px solid ${theme.colors.gray[1]};
    ${theme.fn.smallerThan("sm")} {
      display: none;
    }
  `};
`;

const Item = styled(Text, { shouldForwardProp: (props) => props !== "active" })`
  ${({ theme }) =>
    `line-height: 48px;
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
    }
    
    ${theme.fn.smallerThan("sm")} {
      border: none;
      padding: 0;
      line-height: unset;
      margin-top: 16px;
    }`}

    ${({ active }) => active && `box-shadow: 0 2px 2px rgb(0 0 0 / 10%);`}
  }
`;

const BurgerMenu = styled(Burger)`
  ${({ theme }) => `${theme.fn.largerThan("sm")} {
    display: none;
  }`}
`;

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
`;
