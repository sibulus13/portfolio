export default function BottomSwitcher(props) {
  const showNav = props.showNav;
  const which = props.which;
  const components = props.components;

  return (
    <div className="h-full">
      {showNav && (
        <div className="border-t-4 h-full">
          {components[which]}
        </div>
      )}
    </div>
  );
}
