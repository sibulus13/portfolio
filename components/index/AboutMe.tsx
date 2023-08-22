export default function AboutMe(props) {
    const onClick = props.onClick;
  return (
    <div className="flex flex-col px-2">
      <h2 className="py-4">Who I am</h2>
      <div className="px-4">
        {/* talk about experience and recent projects */}
        With over 3 years of industry software development experience in a
        variety of industries such as Agri-Tech, Robotics, and Alternative
        energy utilizing an even larger spread of technologies, I consider
        myself a Jack of All Trades who knows just enough to understand that I
        have so much more to learn.
        <br></br>
        <br></br>
        {/* Thats a lot of self references...         */}I am currently in the
        process of improving my Full Stack Development skills while exploring
        new ways to apply my knowledge of Control System Design, Machine
        Learning, and Project Management to exponentialize my impact on the
        world.
        {/* Call to action to check out projects and in depth about me */}
      </div>
      <div className="flex justify-end py-6">
        <button onClick={onClick}>
          &gt; Check out my latest projects
        </button>
      </div>
    </div>
  );
}
