import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src="logo.png" alt="Sol" width={25} />
      <input type="text" placeholder="Pesquisar local" className="search-bar" />
      <div className="menu-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
