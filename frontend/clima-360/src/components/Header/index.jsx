import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">🌐 Clima 360</div>
      <input type="text" placeholder="Pesquisar local" className="search-bar" />
    </header>
  );
}
