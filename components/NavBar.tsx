export default function NavBar(props) {
  const toPage = false;
  const showIcon = false;
  const items = props.items;
  return (
    <div>
      <div className="flex justify-center p-4">
        {/* For fabicon */}
        <div className="">
          {showIcon && <div>黄</div>}
          {/* Nav Links*/}
        </div>
        <nav className="flex gap-x-4">
          {items.map((item, index) => (
            <button
              onClick={item.onClick}
              disabled={item.disabled}
              className={`${item.disabled ? "border-b-4" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
