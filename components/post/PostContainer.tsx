import PostItem from "./PostItem";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function PostContainer(props: any) {
  const showSeeMore = props.posts.length > 3 && false;
  const numToShow = props.numToShow || 3;
  return (
    <div className="">
      <h2 className="">{props.title}</h2>
      {/* Mobile Content */}
      <div className="md:invisible ">
        <Carousel swipeable className=''>
          {props.posts
            .slice(0, numToShow)
            .map((article: any, index: number) => (
              <div className="" key={index}>
                <PostItem post={article} />
              </div>
            ))}
        </Carousel>
      </div>
      {/* Desktop Component */}
      <div className="invisible md:visible">
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
