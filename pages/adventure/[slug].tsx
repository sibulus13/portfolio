import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  getPostsFileNames,
  getArticleFromSlug,
  components,
} from "../../helpers/posts";

export default function Post(props: any) {
  let post = props.post;
  let carousel = props.carousel;

  return (
    <div className="flex flex-col items-center justify-center">
      <hr className=""></hr>
      <div>
        <MDXRemote {...post.source} components={components} />
      </div>
    </div>
  );
}

const TYPE = "adventure";
export async function getStaticPaths() {
  const posts = await getPostsFileNames(TYPE);
  return {
    paths: posts,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let { slug } = params;
  slug = path.join(TYPE, slug);
  // mdx remote
  const { content, frontmatter } = await getArticleFromSlug(slug);
  const mdxSource = await serialize(content);
  let files = [];
  if (frontmatter.carousel_dir) {
    // grab name of all files in carousel_dir
    files = fs.readdirSync(
      path.join("public", "posts", TYPE, frontmatter.carousel_dir)
    );
    // console.log(files);
    files = files.map(
      (file) => `/posts/${TYPE}/${frontmatter.carousel_dir}/${file}`
    );
    // console.log(files);
  }

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
      carousel: files,
    },
  };
}
