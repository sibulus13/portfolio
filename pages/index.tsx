import PostContainer from "../components/post/PostContainer";
import NavBar from "../components/NavBar";
import { getPostContent, alt_caption } from "../helpers/posts";
import { description } from "../helpers/index";
import React, { useState } from "react";
import Image from "next/image";
import AboutMe from "../components/index/AboutMe";
import BottomSwitcher from "../components/index/BottomSwitcher";

export default function Home(props) {
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
  }

  const navItems = [
    {
      name: "About Me",
      onClick: () => chooseContent("About Me"),
      disabled: which === "About Me",
    },
    {
      name: "Project",
      onClick: () => chooseContent("Project"),
      disabled: which === "Project",
    },
    {
      name: "Adventure",
      onClick: () => chooseContent("Adventure"),
      disabled: which === "Adventure",
    },
  ];

  const bottomSwitcherProps = {
    "About Me": <AboutMe onClick={() => chooseContent("Project")}></AboutMe>,
    Project: (
      <PostContainer
        title="Latest Projects"
        dir="showcase"
        posts={props.showcasePosts}
        seeMore="/Projects"
      />
    ),
    Adventure: (
      <PostContainer
        title="Latest Adventures"
        dir="adventure"
        posts={props.adventurePosts}
        seeMore="/Adventures"
      />
    ),
  };

  return (
    <div
      className={`flex flex-col px-4 w-screen h-screen ${showNav ? "" : ""}`}
    >
      {/* // Navigation Bar */}
      {showNav && <NavBar items={navItems}></NavBar>}
      {/* Hero Section */}
      <div
        className={`flex w-full ${
          showNav ? "h-max pb-4" : "h-full items-center justify-center"
        }`}
      >
        {/* Hero Intro Text */}
        <div className={`text-6xl ${showNav ? "w-1/2 h-1/2" : ""}`}>
          {!showNav && (
            <div>
              <div>Hi,</div>
              <div>
                I'm Michael
                {showNav && <span>,</span>}
              </div>
            </div>
          )}

          {showNav && (
            <h1>
              As a<span>{description[which].title}</span>
              <h3 className="pt-4 pr-2">{description[which].description}</h3>
            </h1>
          )}
        </div>
        {/* Hero Image */}
        {showNav && (
          <div className="w-1/2 relative">
            <Image
              src={description[which].img}
              alt={alt_caption(description[which].img)}
              fill
              sizes="100%"
              className="object-contain"
            ></Image>
          </div>
        )}
      </div>
      {/* Learn More About me Call to Action*/}
      {!showNav && (
        <button className="pb-6" onClick={() => setShowNav(true)}>
          Learn more about me
        </button>
      )}

      {/* Bottom Dynamic Content */}
        <BottomSwitcher
          showNav={showNav}
          components={bottomSwitcherProps}
          which={which}
        ></BottomSwitcher>
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
