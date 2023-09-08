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
  alt_caption,
  components,
} from "../../helpers/posts";

import { useRouter } from "next/router";

export default function Post(props: any) {
  let post = props.post;
  let carousel = props.carousel;
  const router = useRouter();

  return (
    <div className="w-4/5 py-6 mx-auto">
      <button type="button" onClick={() => router.back()} className="px-0">
        {"<<"}
      </button>
      {/* Header Info */}
      <div>
        <div> {post.frontmatter.date} </div>
        <h1> {post.frontmatter.title} </h1>
        <h2> {post.frontmatter.description} </h2>
      </div>
      {/* Carousel */}
      <div>
        {carousel.length > 0 && (
          <div className="">
            <Carousel
              axis="horizontal"
              //   autoPlay={true}
              centerMode={true}
              centerSlidePercentage={70}
              infiniteLoop={true}
              interval={5000}
              showIndicators={false}
              stopOnHover={true}
            >
              {carousel.map((url: string) => (
                <div className="flex flex-col object-cover h-full w-full whitespace-break-spaces">
                  <Image
                    className="h-6/7"
                    src={url}
                    alt={alt_caption(url)}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    sizes="100vw"
                    width={0}
                    height={0}
                  ></Image>
                  <p className="h-1/7 ">{alt_caption(url)}</p>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
      <hr className="pt-6"></hr>
      {/* MDX Content */}
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
