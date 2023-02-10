export default async function getServerSideProps(ctx) {
  // do something
  const categoriesResponse = await fetch(`https://${process.env.NEXT_PUBLIC_HOST}/wp-json/wp/v2/categories`);
  const categories = await categoriesResponse.json();
  console.log(categories);
  return {
    props: {
      categories,
    },
  };
}
