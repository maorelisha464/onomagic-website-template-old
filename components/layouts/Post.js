import {
  Card,
  Image,
  Text,
} from "@mantine/core";
import Link from "next/link";


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
        <Text color={"blue"} size="sm" weight={500} m={"30px 15px 20px 15px"}>
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
