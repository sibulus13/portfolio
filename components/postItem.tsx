import Image from "next/image";

export default function PostItem(post: any) {
  const hasImg = post.frontmatter.thumbnailUrl;
  return (
    <div className="grid grid-cols-3 rounded-xl border-2 mx-8 my-2 h-86">
      {hasImg && (
        <div className="col-span-3 w-80 h-64 relative m-auto">
          <Image
            src={post.frontmatter.thumbnailUrl}
            style={{
              objectFit: "contain",
            }}
            fill
            alt="img"
            sizes="100%"
            className="p-2"
          />
        </div>
      )}
      {!hasImg && <div className="h-64 col-span-3" />}
      <div className="col-span-2 text-xl font-semibold pl-2">
        {post.frontmatter.title}
      </div>
      <div className="col-span-1 text-right pr-2">{post.frontmatter.date}</div>
      <div className="col-span-3 px-2">{post.frontmatter.description}</div>
      <div className="col-span-3 w-80 px-2 line-clamp-2">
        <div>{renderTags(post.frontmatter.tags)}</div>
      </div>
      <div />
    </div>
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
