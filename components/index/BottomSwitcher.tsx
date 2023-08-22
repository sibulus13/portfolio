export default function BottomSwitcher(props) {
  const showNav = props.showNav;
  const which = props.which;
  const components = props.components;

  return (
    <div className="">
      {showNav && (
        <div className="border-t-4">
          {components[which]}
        </div>
      )}
    </div>
  );
}
