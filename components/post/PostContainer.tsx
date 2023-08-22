import PostItem from "./PostItem";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostContainer(props: any) {
  const showSeeMore = props.posts.length > 3 && false;
  const numToShow = props.numToShow || 3;
  return (
    <div className="px-2 h-full flex-col">
      <h2 className="py-4">{props.title}</h2>
      {/* Mobile Content */}
      <Carousel
        swipeable
        showThumbs={false}
        className="md:invisible rounded-xl border-4 h-5/6"
      >
        {props.posts.slice(1, numToShow).map((article: any, index: number) => (
          <div className="" key={index}>
            <PostItem post={article} />
          </div>
        ))}
      </Carousel>

      {/* Desktop Component */}
      <div className="hidden md:visible">
        <div className="flex flex-row gap-x-20 space-x-10 p-2">
          {props.posts
            .slice(0, numToShow)
            .map((article: any, index: number) => (
              <div className="" key={index}>
                <PostItem post={article} />
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
