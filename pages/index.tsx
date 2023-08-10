import RowContainer from "../components/rowContainer";
import { getPostContent } from "../helpers/posts";

export default function Home(props) {
  return (
    <div>
      <RowContainer
        title="Latest Adventures"
        dir="adventure"
        posts={props.adventurePosts}
        seeMore="/Adventures"
      />
      <RowContainer
        title="Latest Projects"
        dir="showcase"
        posts={props.showcasePosts}
        seeMore="/Projects"
      />
    </div>
  );
}

export async function getStaticProps() {
  const adventurePosts = await getPostContent("adventure");
  const showcasePosts = await getPostContent("showcase");

  return {
    props: {
      adventurePosts,
      showcasePosts,
    },
  };
}
