import PostRow from "../components/PostRow";
import NavBar from "../components/NavBar";
import { getPostContent, alt_caption } from "../helpers/posts";
import { description } from "../helpers/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center px-20">
      {/* // Navigation Bar */}
      {showNav && <NavBar items={navItems}></NavBar>}
      {/* Hero Section */}
      <div
        className={`flex w-full ${
          showNav ? "h-max pb-6" : "h-full items-center justify-center"
        }`}
      >
        {/* Hero Intro Text */}
        <div className={`text-6xl ${showNav ? "w-2/3 h-1/2" : ""}`}>
          <div>Hi,</div>
          <div>
            I'm Michael
            {showNav && <span>,</span>}
          </div>

          {showNav && (
            <div>
              a<span>{description[which].title}</span>
              <h2 className="pt-4">{description[which].description}</h2>
            </div>
          )}
        </div>
        {/* Hero Image */}
        {showNav && (
          <div className="w-1/3 relative">
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
        <div>
          <button className="pt-10" onClick={() => setShowNav(true)}>
            Learn more about me
          </button>
        </div>
      )}
      {/* Bottom Dynamic Content */}
      {showNav && (
        <div className="h-1/2 pt-6 flex w-full border-t-2">
          {which === "About Me" && (
            <div className="text-2xl h-full">
              <div className="text-3xl pb-6 h-content">Who I am</div>
              <div className="px-20 h-max">
                {/* talk about experience and recent projects */}
                With over 3 years of industry software development experience in
                a variety of industries such as Agri-Tech, Robotics, and
                Alternative energy utilizing an even larger spread of
                technologies, I consider myself a Jack of All Trades who knows
                just enough to understand that I have so much more to learn.
                <br></br>
                <br></br>
                {/* Thats a lot of self references...         */}I am currently
                in the process of improving my Full Stack Developement skills
                while exploring new ways to apply my knowledge of Control System
                Design, Machine Learning, and Project Management to
                exponentialize my impact on the world.
              </div>

              {/* Call to action to check out projects and in depth about me */}
              <div className="flex justify-around py-20">
                {/* <button>&gt; Learn more about me</button> */}
                <button onClick={() => chooseContent("Project")}>
                  &gt; Check out my latest projects
                </button>
              </div>
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
