import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import Link from "next/link";

// const useStyles = createStyles((theme) => ({
//   card: {
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//     height: "300px",
//   },

//   section: {
//     borderBottom: `1px solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
//     }`,
//     paddingLeft: theme.spacing.md,
//     paddingRight: theme.spacing.md,
//     paddingBottom: theme.spacing.md,
//   },

//   like: {
//     color: theme.colors.red[6],
//   },

//   label: {
//     textTransform: "uppercase",
//     fontSize: theme.fontSizes.xs,
//     fontWeight: 700,
//   },
// }));

export default function Post({ image, title, category, author, slug }) {
  // const { classes, theme } = useStyles();
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      align={"center"}
      style={{ maxHeight: "400px", height: "400px" }}
    >
      <Card.Section>
        <Link href={`/${slug}`}>
          {image ? (
            <Image src={image} alt={title} height={180} />
          ) : (
            <div style={{ height: "180px" }} />
          )}
        </Link>
      </Card.Section>
      <Card.Section mt="md">
        <Text color={"blue"} size="sm" weight={500}>
          {category}
        </Text>
      </Card.Section>
      <Card.Section mt="md">
        <Link
          style={{
            textDecoration: "none",
          }}
          href={`/${slug}`}
        >
          <Text
            sx={{
              "&:hover": {
                color: "#2196f3",
              },
              color: "black",
            }}
            size="22px"
            mt="xs"
            weight={400}
          >
            {title}
          </Text>
        </Link>
      </Card.Section>
      <Card.Section mt="md">
        <Text color={"#9b9b9b"} size="sm" mt="xs">
          By {author}
        </Text>
      </Card.Section>
    </Card>
  );
}
