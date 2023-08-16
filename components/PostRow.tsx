import PostItem from "./PostItem";

export default function RowContainer(props: any) {
  const showSeeMore = props.posts.length > 3 && false;

  return (
    <div className="pb-4 h-full w-full">
      <div className="text-3xl">{props.title}</div>
      <div className="flex flex-row gap-x-20 items-center justify-center space-x-10 h-full p-4">
        {props.posts.slice(0, 3).map((article: any, index: number) => (
          <div className="h-full" key={index}>
            <PostItem post={article} />
          </div>
        ))}
      </div>
      {/* {showSeeMore && (
        <div className="text-right pr-4 font-semibold">
          <button onClick={() => log(props.seeMore)}>
            <a>See More</a>
          </button>
        </div>
      )} */}
    </div>
  );
}

// function log(item: any) {
//   console.log(item);
// }
