import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

export async function getPostsFileNames(type: string) {
  const dir = path.join("posts", type);
  const filenames = fs.readdirSync(dir);
  const posts = filenames.map(
    (filename) => `/${type}/${filename.split(".")[0]}`
  );
  return posts;
}

export async function getPostContent(type: string) {
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
      carousel_dir: data.carousel_dir ? data.carousel_dir : null,
      ...data,
    },
    content,
    slug,
  };
}

// returns the title portion of path
export function get_image_title(img_props: any) {
  let title = img_props.src.split("/").slice(-1)[0];
  title = title.split(".").slice(-2)[0];
  return title;
}

// grabs name portion of url.
export function alt_caption(url: string) {
  let name = url.split(".")[0]
  name = name.split('/')[name.split('/').length - 1]
  // console.log(name)
  return name
}

export const components = {
  p: (props) => <p>{props.children}</p>,
  a: (props) => (
    <Link href={props.href}>
      <ins>{props.children}</ins>
    </Link>
  ),
  Image: (props) => (
    <div className="flex flex-col items-center pt-2 px-20">
      <Image
        src={props.src}
        alt={get_image_title(props)}
        width="600"
        height="600"
      />
      <p className="text-xs">{get_image_title(props)}</p>
    </div>
  ),
  h1: (props) => <h1>{props.children}</h1>,
  h2: (props) => <h2>{props.children}</h2>,
  h3: (props) => <h3>{props.children}</h3>,
  h6: (props) => <h6 className="">{props.children}</h6>, //captions
};
