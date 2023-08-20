export default function BottomSwitcher(props) {
  const showNav = props.showNav;
  const which = props.which;
  const components = props.components;

  return (
    <div className="h-min">
      {showNav && (
        <div className="border-t-2 h-1/2 pt-6">{components[which]}</div>
      )}
    </div>
  );
}
