import Image from "next/image";
import {alt_caption} from "../helpers/posts";

export default function PostItem({ post }) {
  const hasImg = post.frontmatter.thumbnailUrl;
  return (
    <a href={post.slug} className="h-max">
      <div className="h-full flex flex-col justify-center rounded-xl border-2">
        {/* Image Container */}
        <div className="h-full">
          {hasImg && (
            <div className="col-span-3 relative m-auto min-h-full rounded-xl">
              <Image
                src={post.frontmatter.thumbnailUrl}
                style={{
                  objectFit: "contain",
                }}
                fill
                alt={alt_caption(post.frontmatter.thumbnailUrl)}
                className="p-2 rounded-xl"
              />
            </div>
          )}
        </div>
        {/* Text Container */}
        <div className="grid grid-cols-3">
          {!hasImg && <div className="col-span-3" />}
          <div className="col-span-2 text-xl font-semibold pl-2">
            {post.frontmatter.title}
          </div>
          <div className="col-span-1 text-right pr-2">
            {post.frontmatter.date}
          </div>
          <div className="col-span-3 px-2">{post.frontmatter.description}</div>
          <div className="col-span-3 w-80 px-2 line-clamp-2">
            <div>{renderTags(post.frontmatter.tags)}</div>
          </div>
          <div />
        </div>
      </div>
    </a>
  );
}

function renderTags(tags: string[]) {
  // Shows tags in a row with a hashtag
  return tags.map((tag) => (
    <div key={tag} className="inline-block text-sm font-semibold italic">
      #{tag} &nbsp; &nbsp;
    </div>
  ));
}
