import PostItem from "./postItem";
import Link from "next/link";
export default function RowContainer(props: any) {
  const showSeeMore = props.posts.length > 3;
  return (
    <div className="pb-4">
      <div className="text-3xl pl-8">{props.title}</div>
      <div className="flex flex-row gap-x-20 items-center justify-center space-x-10">
        {props.posts.slice(0, 3).map((article: any) => (
          <div key={article.title}>
            <PostItem {...article} />
          </div>
        ))}
      </div>
      {showSeeMore && (
        <div className="text-right pr-4 font-semibold">
          {/* TODO implement other main pages */}
          <button onClick={() => log(props.seeMore)}>See More</button>
        </div>
      )}
    </div>
  );
}

function log(item: any) {
  console.log(item);
}
