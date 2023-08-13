import RowContainer from "../components/rowContainer";
import { getPostContent } from "../helpers/posts";
import { titles } from "../helpers/index";
import React, { useEffect } from "react";

export default function Home(props) {
  useEffect(() => {
    changeTitle();
  }, []);

  return (
    <div>
      <div>
        <div className="text-3xl pl-8">
          Hi, I'm Michael, a
          <span id="personal-descriptor"> {titles[titles.length - 1]}</span>
        </div>
      </div>
      <RowContainer
        title="Latest Projects"
        dir="showcase"
        posts={props.showcasePosts}
        seeMore="/Projects"
      />
      <RowContainer
        title="Latest Adventures"
        dir="adventure"
        posts={props.adventurePosts}
        seeMore="/Adventures"
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

function changeTitle() {
  // change the text in ID "personal-descriptor" every 10 seconds
  let i = 0;
  setInterval(() => {
    document.getElementById("personal-descriptor").innerHTML = titles[i];
    i = (i + 1) % titles.length;
  }, 10000);
}
