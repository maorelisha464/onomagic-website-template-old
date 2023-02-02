import Head from "next/head";
import Footer1 from "../components/layouts/footers/footer1";
import Header1 from "../components/layouts/headers/header1";
import { createStyles, Container, Title, Text, Button, Group } from "@mantine/core";
import Link from "next/link";
// import { Illustration } from './Illustration';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  inner: {
    position: "relative",
  },

  image: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  text404: {
    fontSize: "150px",
    fontWeight: "900",
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function Custom404() {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Header1></Header1>
      <Container className={classes.root}>
        <div className={classes.inner}>
          {/* <Illustration className={classes.image} /> */}
          <div className={classes.content}>
            <Text color="dimmed" size="lg" align="center" className={classes.text404}>
              404
            </Text>
            <Title className={classes.title}>Page not found</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
              Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Group position="center">
              <Link href="/" style={{ color: "white", textDecoration: "none" }}>
                {" "}
                <Button size="md">Take me back to home page</Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>
      <Footer1></Footer1>
    </>
  );
}
