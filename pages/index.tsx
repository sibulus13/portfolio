import fs from "fs";
import Head from "next/head";
import matter from "gray-matter";
import { Carousel } from "react-responsive-carousel";
import path from "path";
import RowContainer from "../components/rowContainer";

export default function Home(props) {
  console.log(props);
  return (
    <div className="">
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

async function getPostContent(type: string) {
  const posts = await getPostsFileNames(type);
  // iterate through posts to getArticleFromSlug
  let articles = await Promise.all(
    posts.map((post) => getArticleFromSlug(post))
  );
  // sort articles by reverse chronological date
  articles = articles.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
    );
  });
  return articles;
}

async function getPostsFileNames(type: string) {
  const dir = path.join("posts", type);
  const filenames = fs.readdirSync(dir);
  const posts = filenames.map(
    (filename) => `/${type}/${filename.split(".")[0]}`
  );
  return posts;
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

export async function getArticleFromSlug(slug) {
  const articlePath = path.join("posts", `${slug}.mdx`);
  const source = fs.readFileSync(articlePath);
  // mdx remote
  const { content, data } = matter(source);

  return {
    frontmatter: {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      tags: data.tags,
      ...data,
    },
    content,
    path: articlePath,
  };
}
