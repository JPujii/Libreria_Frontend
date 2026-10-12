import React, { useMemo, useState } from "react";

const categories = ["Top ventas", "Fantasy", "Romance", "Sci-Fi", "Terror", "Histórica", "Erótica"];

const books = [
  { title: "El reino de la bruma", author: "Lucía Ferrer", category: "Fantasy", price: "22,00 €", cover: "mist" },
  { title: "Todo lo que fuimos", author: "Elena Costa", category: "Romance", price: "19,50 €", cover: "memory" },
  { title: "Órbita cero", author: "Bruno Vidal", category: "Sci-Fi", price: "21,00 €", cover: "orbit" },
  { title: "La casa del eco", author: "Sara Beltrán", category: "Terror", price: "20,00 €", cover: "echo" },
  { title: "Las hijas del olivo", author: "Alba Medina", category: "Histórica", price: "23,00 €", cover: "olive" },
  { title: "La piel del verano", author: "Vera Abril", category: "Erótica", price: "18,50 €", cover: "summer" },
  { title: "Un hilo de luz", author: "Leo Márquez", category: "Poesía", price: "16,00 €", cover: "light" },
  { title: "El arte de detenerse", author: "Nora Montes", category: "Ensayo", price: "18,00 €", cover: "still" },
];

const featured = [
  {
    tag: "LA ELECCIÓN DE NUESTROS LECTORES",
    title: "El jardín de las horas",
    author: "Clara Valdés · Narrativa",
    description: "Una casa, tres generaciones y un secreto que florece.",
    cover: "garden",
    badge: "Top ventas",
  },
  {
    tag: "VOCES QUE ABREN CAMINO",
    title: "La cartografía del silencio",
    author: "Mateo Ríos · Poesía",
    description: "Versos para nombrar lo que siempre estuvo dentro.",
    cover: "silence",
    badge: "Top autopublicados",
  },
  {
    tag: "TU PRÓXIMO DESCUBRIMIENTO",
    title: "Donde duermen las estrellas",
    author: "Inés Soler · Fantasy",
    description: "El cielo guarda historias que aún no hemos contado.",
    cover: "stars",
    badge: "Nuevos autopublicados",
  },
];

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    heart: <path d="M20.8 8.8c0 4.5-8.8 10-8.8 10s-8.8-5.5-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function BookCover({ book, large = false }) {
  return (
    <div className={`book-cover cover-${book.cover}${large ? " book-cover-large" : ""}`} aria-label={`Cubierta de ${book.title}`} role="img">
      <span className="cover-mark">ÁUREA</span>
      <span className="cover-title">{book.coverTitle || book.title}</span>
      <span className="cover-author">{book.author?.split(" · ")[0]}</span>
      <span className="cover-ornament" aria-hidden="true" />
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cartCount, setCartCount] = useState(0);

  const visibleBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return books.filter((book) => {
      const matchesCategory = activeCategory === "Todos" || book.category === activeCategory;
      const matchesQuery = !normalizedQuery || `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase("es").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const selectCategory = (category) => {
    setActiveCategory(category === "Top ventas" ? "Todos" : category);
    document.getElementById("novedades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="announcement">
        <span>EDITORIAL INDEPENDIENTE</span>
        <span className="announcement-dot">✦</span>
        <span>LIBROS PARA HABITAR OTROS MUNDOS</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Áurea Editorial, inicio">
          <span className="brand-name">ÁUREA</span>
          <span className="brand-subtitle">EDITORIAL</span>
        </a>
        <label className="search-box">
          <Icon name="search" />
          <input
            aria-label="Buscar libros, autores e historias"
            placeholder="Buscar libros, autores, historias…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="search-shortcut">⌘ K</span>
        </label>
        <a className="publish-link" href="mailto:hola@aureaeditorial.es?subject=Publicar%20con%20%C3%81urea">Publica con nosotros <Icon name="arrow" size={15} /></a>
        <button className="cart-button" aria-label={`Carrito, ${cartCount} artículos`}>
          <Icon name="bag" size={20} /><span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <nav className="category-nav" aria-label="Categorías">
        {categories.map((category) => (
          <button className={activeCategory === category ? "nav-category active" : "nav-category"} key={category} onClick={() => selectCategory(category)}>
            {category}
          </button>
        ))}
      </nav>

      <main id="inicio">
        <section className="hero-section">
          <div className="section-eyebrow"><span className="eyebrow-line" /> SELECCIÓN EDITORIAL / OCTUBRE 2026</div>
          <div className="hero-heading-row">
            <h1>Un lugar para<br /><em>cada historia.</em></h1>
            <p>Libros que encuentran su camino hasta ti.<br />Voces nuevas, mundos por descubrir.</p>
          </div>
          <div className="featured-grid">
            {featured.map((item, index) => (
              <article className={`featured-card featured-${index + 1}`} key={item.title}>
                <div className="featured-art">
                  <BookCover book={item} large />
                  <span className="featured-index">0{index + 1}</span>
                  <span className="featured-badge">{item.badge}</span>
                </div>
                <div className="featured-copy">
                  <span className="eyebrow">{item.tag}</span>
                  <h2>{item.title}</h2>
                  <span className="featured-author">{item.author}</span>
                  <p>{item.description}</p>
                  <a className="text-link" href="#novedades">Descubrir libro <Icon name="arrow" size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="new-releases content-section" id="novedades">
          <div className="section-heading">
            <div>
              <span className="section-kicker">ENCUENTRA TU PRÓXIMA LECTURA</span>
              <h2>Novedades</h2>
              <p>Recién llegados a nuestras estanterías. Encuentra tu próxima lectura.</p>
            </div>
            <a className="outline-link" href="#catalogo">Ver todas las novedades <Icon name="arrow" size={15} /></a>
          </div>
          <div className="filter-row" aria-label="Filtrar por género">
            <button className={activeCategory === "Todos" ? "filter-chip selected" : "filter-chip"} onClick={() => setActiveCategory("Todos")}>Todos los libros</button>
            {categories.slice(1).map((category) => (
              <button className={activeCategory === category ? "filter-chip selected" : "filter-chip"} key={category} onClick={() => setActiveCategory(activeCategory === category ? "Todos" : category)}>
                {category}
              </button>
            ))}
          </div>
          {visibleBooks.length ? (
            <div className="book-grid" id="catalogo">
              {visibleBooks.map((book, index) => (
                <article className="book-card" key={book.title}>
                  <div className="book-art">
                    <BookCover book={book} />
                    <span className="book-number">0{index + 1}</span>
                    <button className="favorite-button" aria-label={`Guardar ${book.title}`}><Icon name="heart" size={16} /></button>
                  </div>
                  <span className="book-category">{book.category}</span>
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <div className="book-buy-row">
                    <span className="book-price">{book.price}</span>
                    <button className="add-button" aria-label={`Añadir ${book.title} al carrito`} onClick={() => setCartCount((count) => count + 1)}>+</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">No encontramos libros con esa búsqueda. Prueba con otro título o autor.</div>
          )}
          <div className="catalogue-note"><span>UNA HISTORIA TE ESTÁ ESPERANDO</span><a href="#inicio">Volver arriba ↑</a></div>
        </section>

        <section className="about-community content-section">
          <article className="about-card">
            <div className="about-text">
              <span className="section-kicker">EL OFICIO DE CONTAR</span>
              <h2>Sobre<br /><em>nosotros</em></h2>
              <p>Somos Áurea, una editorial independiente que cree en las historias bien cuidadas. Acompañamos a autores y autopublicados desde el primer manuscrito hasta el encuentro con sus lectores.</p>
              <a className="text-link" href="#footer">Nuevas voces. Libros que permanecen. <Icon name="arrow" size={15} /></a>
            </div>
            <div className="about-seal"><span>LIBROS<br />CON ALMA</span><span className="seal-star">✳</span><span>DESDE 2018</span></div>
            <div className="contact-stamp"><span>CONTACTO</span><a href="mailto:hola@aureaeditorial.es">hola@aureaeditorial.es</a></div>
          </article>

          <article className="community-card">
            <div className="section-heading community-heading">
              <div><span className="section-kicker">LECTORES QUE CREAN</span><h2>Conócenos</h2></div>
              <a className="text-link" href="#fanart">Ver galería <Icon name="arrow" size={15} /></a>
            </div>
            <p className="community-intro">Las historias siguen más allá de la última página. Así imaginan nuestros lectores los mundos de Áurea.</p>
            <div className="fanart-grid" id="fanart">
              <div className="fanart-tile fanart-one"><span>UN JARDÍN<br />EN EL TIEMPO</span><small>@ines.ilustra</small></div>
              <div className="fanart-tile fanart-two"><span>DONDE NACEN<br />LAS ESTRELLAS</span><small>@mar.de.tinta</small></div>
              <div className="fanart-tile fanart-three"><span>MAPAS<br />DEL SILENCIO</span><small>@papel_y_luna</small></div>
            </div>
            <div className="community-footer"><span><strong>#UniversoÁurea</strong><br />Arte creado por nuestra comunidad</span><a href="mailto:hola@aureaeditorial.es">Envía tu fanart <Icon name="arrow" size={14} /></a></div>
          </article>
        </section>

        <section className="sponsors content-section">
          <div><span className="section-kicker">EN BUENA COMPAÑÍA</span><h2>Patrocinadores</h2><p>Quienes nos ayudan a dar vida a cada página.</p></div>
          <div className="sponsor-logos" aria-label="Nuestros patrocinadores">
            <span className="sponsor-script">papel vivo</span><span className="sponsor-serif">La Linterna</span><span className="sponsor-sans">TRAMA<span>®</span></span>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <a className="brand footer-brand" href="#inicio"><span className="brand-name">ÁUREA</span><span className="brand-subtitle">EDITORIAL</span></a>
            <p>Cada historia merece<br />encontrar su lugar.</p>
            <a className="footer-email" href="mailto:hola@aureaeditorial.es">hola@aureaeditorial.es</a>
          </div>
          <div className="footer-links"><h3>Productos</h3><a href="#catalogo">Catálogo de libros</a><a href="#catalogo">Autopublicados</a><a href="#novedades">Novedades</a></div>
          <div className="footer-links"><h3>Políticas</h3><a href="#footer">Envíos y devoluciones</a><a href="#footer">Privacidad</a><a href="#footer">Condiciones de compra</a></div>
          <div className="footer-links"><h3>Compañía</h3><a href="#footer">Sobre nosotros</a><a href="mailto:hola@aureaeditorial.es?subject=Publicar%20con%20%C3%81urea">Publica con Áurea</a><a href="mailto:hola@aureaeditorial.es">Contacto</a></div>
          <div className="footer-links"><h3>Social</h3><a href="#footer">Instagram <Icon name="arrow" size={12} /></a><a href="#footer">Pinterest <Icon name="arrow" size={12} /></a><a href="#footer">TikTok <Icon name="arrow" size={12} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Áurea Editorial · Cada historia merece su lugar.</span><div><a href="#footer">Preferencias de cookies</a><span className="secure-note"><Icon name="heart" size={13} /> Compra segura</span></div></div>
      </footer>
    </>
  );
}

export default App;
