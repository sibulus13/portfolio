import fs from "fs";
import Head from "next/head";
import { Carousel } from "react-responsive-carousel";
import path from "path";
import RowContainer from "../components/rowContainer";
import { getPostContent } from "../helpers/posts";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <RowContainer
        title="Latest Adventures"
        posts={props.adventurePosts}
        seeMore="/Adventures"
      />
      <RowContainer
        title="Latest Projects"
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
