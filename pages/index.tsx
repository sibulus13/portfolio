import PostRow from "../components/PostRow";
import NavBar from "../components/NavBar";
import { getPostContent, alt_caption } from "../helpers/posts";
import { description } from "../helpers/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home(props) {
  {
    /* Change layout with custom descriptor, aside img, and content based on About Me, Project, Adventure pressed */
  }
  const showIcon = false;
  const [which, setWhich] = useState("About Me");
  const [showNav, setShowNav] = useState(false);

  function chooseContent(which: string) {
    switch (which) {
      case "About Me":
        setWhich(which);
        break;
      case "Project":
        setWhich(which);
      case "Adventure":
        setWhich(which);
        break;
      default:
        break;
    }
    console.log(which);
  }

  return (
    <div className="flex flex-col justify-center h-screen items-center m-10">
      {/* // Navigation Bar */}
      {showNav && (
        <div>
          <div className="flex justify-center">
            {/* For fabicon */}
            <div className="">
              {showIcon && <div>黄</div>}
              {/* Nav Links*/}
            </div>
            <nav className="flex gap-x-4">
              <button onClick={() => chooseContent("About Me")}>
                About Me
              </button>
              <button onClick={() => chooseContent("Project")}>Project</button>
              <button onClick={() => chooseContent("Adventure")}>
                Adventure
              </button>
            </nav>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div
        className={`flex w-full ${
          showNav ? "h-1/2" : "h-full items-center justify-center"
        }`}
      >
        {/* Hero Intro Text */}
        <div className={`text-6xl ${showNav ? "ml-14 w-1/2 h-1/2" : ""}`}>
          <div>Hi,</div>
          <div>
            I'm Michael
            {showNav && <span>,</span>}
          </div>

          {showNav && (
            <div>
              a<span>{description[which].title}</span>
              {/* Breakline with a border */}
              <br className="border-bottom" />
              <h2 className="pt-4">{description[which].description}</h2>
            </div>
          )}
        </div>
        {/* Hero Image */}
        {showNav && (
          <div className="w-1/2 relative">
            <Image
              src={description[which].img}
              alt={alt_caption(description[which].img)}
              fill
              objectFit="contain"
            ></Image>
          </div>
        )}
      </div>
      {!showNav && (
        <div>
          <button className="pt-10" onClick={() => setShowNav(true)}>
            Learn more about me
          </button>
        </div>
      )}
      {/* Bottom Dynamic Content */}
      {showNav && (
        <div className="h-1/2 w-full">
          {which === "About Me" && (
            <div>
              <div>Insert About me stuff here</div>
            </div>
          )}
          {which === "Project" && (
            <PostRow
              title="Latest Projects"
              dir="showcase"
              posts={props.showcasePosts}
              seeMore="/Projects"
            />
          )}
          {which === "Adventure" && (
            <PostRow
              title="Latest Adventures"
              dir="adventure"
              posts={props.adventurePosts}
              seeMore="/Adventures"
            />
          )}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const adventurePosts = await getPostContent("adventure");
  const showcasePosts = await getPostContent("showcase");

  return {
    props: {
      adventurePosts,
      showcasePosts,
    },
  };
}
