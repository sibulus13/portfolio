import PostItem from "./PostItem";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostContainer(props: any) {
  const showSeeMore = props.posts.length > 3 && false;
  const mobile = props.mobile || false;
  let numToShow = props.numToShow || 3;
  if (mobile) {
    numToShow = 1;
  }
  return (
    <div className="px-2 flex-col h-full">
      <h2 className="py-4">{props.title}</h2>
      {/* Mobile Carousel (WIP) */}
      {/* <Carousel
        swipeable
        showThumbs={false}
        className="md:invisible rounded-xl border-4 h-5/6 flex items-center"
        // containerCustomStyle={{ height: "100%" }}
      >
        {props.posts.slice(1, numToShow).map((article: any, index: number) => (
          <PostItem post={article} key={index} />
        ))}
      </Carousel> */}

      {/* Mobile Component */}
      <div className="sm:hidden rounded-xl border-4 h-5/6 items-center">
        {props.posts.slice(1, 2).map((article: any, index: number) => (
          <PostItem post={article} key={index} />
        ))}
      </div>

      {/* Desktop Component */}
      <div className="flex justify-center">
        <div className="hidden p-2 items-center sm:inline-grid grid-flow-col gap-4 ">
          {props.posts
            .slice(0, numToShow)
            .map((article: any, index: number) => (
              <div className="col-span-1 rounded-xl border-4 h-full">
                <PostItem post={article} key={index} />
              </div>
            ))}
        </div>
      </div>

      {/* See More */}
      {showSeeMore && (
        <div className="text-right pr-4 font-semibold">
          <button onClick={() => log(props.seeMore)}>
            <a>See More</a>
          </button>
        </div>
      )}
    </div>
  );
}

function log(item: any) {
  console.log(item);
}
