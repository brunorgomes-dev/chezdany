import { useEffect, useState } from 'react'

const dishes = [
  { name: 'Cachupa', price: '500', description: 'Cachupa guisada com ovo estrelado e chouriço, acompanhada de pão com manteiga e meia de leite.' },
  { name: 'Menu Doces', price: '600', description: 'Iogurte caseiro com cereais, crepe com caramelo agridoce, fruta da época e sumo natural do dia.' },
  { name: 'Promoção do Momento', price: '120', description: 'Meia de leite mais pão com manteiga.' },
  { name: 'Sandes de Atum', price: '250', description: 'Com alface e tomate.' },
  { name: 'Sandes de Queijo e Fiambre', price: '250', description: '' },
  { name: 'Ovos Mexidos', price: '200', description: 'Adicione bacon por mais 100 CVE.' },
  { name: 'Tosta Mista', price: '250', description: '' },
  { name: 'Cachupa Guisada', price: '380', description: 'Com ovo estrelado e chouriço.' },
]

type MenuItem = { name: string; price: string; description?: string }
type MenuGroup = { title: string; items: MenuItem[] }

const fullMenu: MenuGroup[] = [
  { title: 'Entradas', items: [
    { name: 'Pastéis de Bacalhau', price: '500', description: '3 unidades crocantes, recheadas com bacalhau e peixe seco.' },
    { name: 'Tártaro de Peixe', price: '900', description: 'Peixe do dia preparado com leite de coco e abacate.' },
    { name: 'Panados de Chouriço', price: '700', description: 'Chouriço de sangue panado, chutney de papaia e pickles de cebola roxa.' },
    { name: 'Paté de Pato', price: '850', description: 'Paté caseiro com pimenta rosa de Santo Antão, servido com tostas.' },
  ]},
  { title: 'Pratos', items: [
    { name: 'Feijoada do Mar', price: '2200', description: 'Búzios, camarão nacional, lula, polvo, peixe do dia e chouriço, acompanhada de arroz.' },
    { name: 'Polvo Grelhado', price: '2400', description: 'Batatas assadas, salada de pimentos grelhados e ketchup de pimentão vermelho.' },
    { name: 'Hambúrguer Chez Dany', price: '1200', description: 'Bife de novilho, molho tártaro, cebola caramelizada, cornichons, alface e tomate.' },
    { name: 'Lombo de Porco Assado', price: '1900', description: 'Porco nacional assado durante 5 horas, creme de soja, legumes e pickles.' },
    { name: 'Bife de Atum', price: '1200', description: 'Atum meio cozido com sésamo, vinagrete de soja e legumes salteados.' },
  ]},
  { title: 'Saladas', items: [
    { name: 'Salada Tropical', price: '1350', description: 'Espetada de camarão e tomate, vinagrete de manga, alface, cenoura, ananás e abacate.' },
  ]},
  { title: 'Sobremesas', items: [
    { name: 'Mousse de Chocolate', price: '500', description: 'Mousse cremosa finalizada com amêndoas.' },
    { name: 'Panacota de Manga', price: '400', description: 'Sobremesa cremosa e delicada com o sabor tropical da manga.' },
    { name: 'Queijo Terra', price: '450', description: 'Queijo Terra servido com doce de papaia.' },
    { name: 'Café Gourmand', price: '500' },
  ]},
  { title: 'Águas & Softs', items: [
    { name: 'Água Caramulo Premium 0,5L / 1L', price: '150 / 250' }, { name: 'Água das Pedras 25cl', price: '220' },
    { name: 'Água Tónica 33cl', price: '220' }, { name: 'Sumo “Da Feris” 20cl', price: '220' },
    { name: 'Fanta / Sprite / Coca-Cola 50cl', price: '220' }, { name: 'Malta Actimalt', price: '250' },
    { name: 'Ice Tea Caseiro', price: '500' }, { name: 'Sumo de Laranja Natural', price: '400' },
    { name: 'Sumo de Papaia ou Manga Natural', price: '350' },
  ]},
  { title: 'Bebidas Quentes', items: [
    { name: 'Café Expresso / Descafeinado', price: '100' }, { name: 'Café Pingado', price: '120' },
    { name: 'Americano', price: '150' }, { name: 'Cappuccino', price: '250' }, { name: 'Meia de Leite', price: '180' },
    { name: 'Chá', price: '200' }, { name: 'Chocolate Quente', price: '400' },
  ]},
  { title: 'Aperitivos', items: [
    { name: 'Martini Rosso / Bianco 5cl', price: '400' }, { name: 'Ricard 2cl', price: '450' },
    { name: 'Licor Beirão', price: '450' }, { name: 'Vinho do Porto CADAO 5cl', price: '350' },
    { name: 'Whiskey Grants 4cl', price: '600' }, { name: 'Gin GREAU Bio 4cl', price: '1100' },
    { name: 'XPTO Dry Gin 4cl', price: '600' }, { name: 'Get 27', price: '350' },
  ]},
  { title: 'Vinhos Brancos & Rosés', items: [
    { name: 'TUD DRET Frisante 14cl / 75cl', price: '350 / 1500' }, { name: 'PILON Branco 14cl / 75cl', price: '370 / 1850' },
    { name: 'CHA Vinho do Fogo Branco 14cl / 37,5cl / 75cl', price: '720 / 1800 / 2800' },
    { name: 'PILON Rosé 14cl / 75cl', price: '370 / 1850' },
  ]},
  { title: 'Vinhos Tintos & Espumantes', items: [
    { name: 'PILON Tinto 14cl / 75cl', price: '370 / 1850' }, { name: 'MORABEZA Premium 14cl / 75cl', price: '400 / 2200' },
    { name: 'CHA Vinho do Fogo Tinto 14cl / 37,5cl / 75cl', price: '720 / 1800 / 2800' },
    { name: 'FIUZA 3 Castas Nature 14cl / 75cl', price: '380 / 1900' },
  ]},
  { title: 'Cervejas', items: [
    { name: 'Strela Kriola 25cl', price: '200' }, { name: 'Strela Kriola Imperial 25cl / 50cl', price: '200 / 400' },
    { name: 'Super Bock Mini', price: '200' }, { name: 'Sommersby Cidra 20cl', price: '280' },
  ]},
  { title: 'Cocktails', items: [
    { name: 'Caipirinha', price: '500' }, { name: 'Caipirinha de Manga ou Maracujá', price: '600' },
    { name: 'Caipi Black', price: '600' }, { name: 'Mojito', price: '550' }, { name: 'Piña Colada', price: '700' },
    { name: 'Aperol Spritz / Gin Tonic', price: '700' }, { name: 'Virgin Mojito / Virgin Colada', price: '400' },
  ]},
  { title: 'Grogue & Ponches', items: [
    { name: 'Grogue Branca de Sintanton 4cl', price: '200' }, { name: 'Contrabond / Contrabond Velha', price: '400 / 500' },
    { name: 'Ponche de Mel, Coco ou Maracujá', price: '300' }, { name: 'Xtomperod', price: '450' },
  ]},
]

const Arrow = () => <span aria-hidden="true">↗</span>
const ArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 10.5 8 4.5 14 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const whatsappReservation = 'https://wa.me/2389709250?text=Ol%C3%A1%20Chez%20Dany%2C%20gostaria%20de%20fazer%20uma%20reserva.'

function ScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={visible ? 'scroll-top visible' : 'scroll-top'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
    >
      <ArrowUp />
    </button>
  )
}

const SocialLinks = () => (
  <div className="social-links">
    <a href="https://www.instagram.com/chez_dany_mindelo/" target="_blank" rel="noreferrer">Instagram <Arrow /></a>
    <a href="https://www.facebook.com/profile.php?id=61590319507839" target="_blank" rel="noreferrer">Facebook <Arrow /></a>
    <a href="https://www.tiktok.com/@chez_dany_mindelo?lang=pt" target="_blank" rel="noreferrer">TikTok <Arrow /></a>
  </div>
)

function MenuPage() {
  const [active, setActive] = useState('Entradas')
  const group = fullMenu.find((item) => item.title === active) ?? fullMenu[0]
  return (
    <main className="full-menu-page">
      <header className="site-header menu-page-header">
        <a className="brand" href="/" aria-label="Chez Dany — início"><img src="/chezdanyclaro-removebg-preview.png" alt="Chez Dany" /></a>
        <nav className="nav"><a href="/">Home</a><a href="/#sobre">Sobre</a><a href="/menu">Menu</a><a href="/#pratododia">Pratos do dia</a></nav>
        <a className="header-cta" href={whatsappReservation} target="_blank" rel="noreferrer">Reservar <Arrow /></a>
      </header>
      <section className="menu-hero">
        <p className="eyebrow light">Sabores di nós terra</p>
        <h1>Nosso <em>menu</em></h1>
        <p>Ingredientes frescos, receitas com memória e o melhor da gastronomia cabo-verdiana.</p>
      </section>
      <section className="full-menu">
        <div className="category-nav">
          {fullMenu.map((item) => <button className={active === item.title ? 'active' : ''} onClick={() => setActive(item.title)} key={item.title}>{item.title}</button>)}
        </div>
        <div className="full-menu-content">
          <div className="category-heading"><p className="eyebrow">Menu completo</p><h2>{group.title}</h2><span>Preços em CVE</span></div>
          <div className="full-dish-grid">
            {group.items.map((item) => (
              <article className="full-dish" key={item.name}>
                <div><h3>{item.name}</h3>{item.description && <p>{item.description}</p>}</div>
                <strong>{item.price}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-top compact">
          <img className="footer-logo" src="/chezdanyclaro-removebg-preview.png" alt="Chez Dany" />
          <div><span>Contato</span><p>+238 232 32 39<br />+238 970 92 50</p></div>
          <div><span>Siga-nos</span><SocialLinks /></div>
        </div>
        <div className="footer-bottom"><span>© Copyright {new Date().getFullYear()} – Chez Dany by <a className="gs-link" href="https://wa.me/2389996056" target="_blank" rel="noreferrer">GS STUDIO</a></span><span>Sabores di nós terra</span></div>
      </footer>
      <ScrollTop />
    </main>
  )
}

export default function App() {
  if (window.location.pathname.startsWith('/menu')) return <MenuPage />
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuType, setMenuType] = useState<'breakfast' | 'typical'>('breakfast')

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Chez Dany — início">
          <img src="/chezdanyclaro-removebg-preview.png" alt="Chez Dany" />
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">
          <a href="#inicio" onClick={closeMenu}>Home</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="/menu" onClick={closeMenu}>Menu</a>
          <a href="#pratododia" onClick={closeMenu}>Pratos do dia</a>
        </nav>
        <a className="header-cta" href={whatsappReservation} target="_blank" rel="noreferrer">Reservar <Arrow /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu">
          <span></span><span></span>
        </button>
      </header>

      <section className="hero" id="inicio">
        <img className="hero-bg" src="/gastronomia-cabo-verde-restaurante-chez-dany-04-blur1.jpeg" alt="" />
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="eyebrow light">Restaurante • Mindelo, Cabo Verde</p>
          <h1>Sabores<br /><em>di nós terra</em></h1>
          <p className="hero-copy">Descubra a cozinha tradicional cabo-verdiana, preparada com produtos frescos, ingredientes nacionais e paixão pela nossa gastronomia.</p>
          <div className="hero-actions">
            <a className="button primary" href="/menu">Explorar menu <Arrow /></a>
            <a className="text-link" href="#sobre">Conheça nossa história <span>↓</span></a>
          </div>
        </div>
        <div className="hero-note"><span>Aberto hoje</span><strong>07h — 22h</strong></div>
      </section>

      <section className="about section" id="sobre">
        <div className="about-collage">
          <img className="about-main" src="/chef-dany-restaurante-cabo-verde-15.jpeg" alt="Chef Dany preparando um prato" />
          <img className="about-small" src="/comida-cabo-verdiana-chez-dany-12.jpeg" alt="Prato tradicional do Chez Dany" />
          <div className="years"><strong>15</strong><span>anos de<br />experiência</span></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">Bem-vindos ao Chez Dany</p>
          <h2>Paixão à mesa,<br /><em>raízes no coração.</em></h2>
          <p>O Chez Dany nasceu de uma história de família, paixão pela gastronomia e vontade de regressar às nossas raízes.</p>
          <p>Depois de 15 anos de experiência na restauração em Paris, regressámos a Cabo Verde para criar um restaurante à nossa imagem, onde a cozinha tradicional cabo-verdiana encontra a experiência adquirida ao longo dos anos em França.</p>
          <a className="text-link dark" href="/menu">Descobrir nossos sabores <Arrow /></a>
        </div>
      </section>

      <section className="values">
        {['Produtos frescos', 'Sabores de Cabo Verde', 'Ambiente acolhedor', 'História de família'].map((item, i) => (
          <div className="value" key={item}><span>0{i + 1}</span><p>{item}</p></div>
        ))}
      </section>

      <section className="daily section" id="pratododia">
        <div className="daily-heading">
          <div>
            <p className="eyebrow">Todos os dias, algo especial</p>
            <h2>Nossos <em>pratos do dia</em></h2>
          </div>
          <p>Nossa cozinha acompanha os produtos disponíveis e a inspiração da chef, criando sugestões que valorizam os sabores de Cabo Verde.</p>
        </div>
        <div className="food-gallery">
          <article className="food-card large">
            <img src="/kachupa-chez-dany.png" alt="Cachupa do Chez Dany" />
            <div><span>Prato assinatura</span><h3>Cachupa com alma</h3></div>
          </article>
          <article className="food-card">
            <img src="/tradicao.jpeg" alt="Tradição à nossa maneira — prato típico cabo-verdiano" />
            <div><span>Sabores locais</span><h3>Tradição à nossa maneira</h3></div>
          </article>
          <article className="food-card">
            <img src="/pequeno-almoco-cabo-verde.jpeg" alt="Pequeno-almoço Chez Dany" />
            <div><span>Comece bem o dia</span><h3>Pequeno-almoço</h3></div>
          </article>
        </div>
      </section>

      <section className="menu-section section" id="menu">
        <div className="menu-title">
          <p className="eyebrow light">Sabores da nossa terra</p>
          <h2>Menu <em>Chez Dany</em></h2>
          <div className="tabs" role="tablist">
            <button className={menuType === 'breakfast' ? 'active' : ''} onClick={() => setMenuType('breakfast')}>Pequeno-almoço</button>
            <button className={menuType === 'typical' ? 'active' : ''} onClick={() => setMenuType('typical')}>Pratos típicos</button>
          </div>
        </div>
        <div className="dish-list">
          {dishes.map((dish, i) => (
            <article className="dish" key={`${menuType}-${dish.name}-${i}`}>
              <div><h3>{dish.name}</h3>{dish.description && <p>{dish.description}</p>}</div>
              <strong>{dish.price} <small>CVE</small></strong>
            </article>
          ))}
        </div>
      </section>

      <section className="reservation">
        <img src="/chef-dany-restaurante-cabo-verde-10.jpeg" alt="" />
        <div className="reservation-shade"></div>
        <div className="reservation-content">
          <p className="eyebrow light">Uma mesa à sua espera</p>
          <h2>Sabores tradicionais,<br /><em>momentos para recordar.</em></h2>
          <p>Produtos frescos e uma cozinha feita com paixão. Estamos à sua espera.</p>
          <a className="button primary" href={whatsappReservation} target="_blank" rel="noreferrer">Reserve sua mesa <Arrow /></a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <img className="footer-logo" src="/chezdanyclaro-removebg-preview.png" alt="Chez Dany" />
          <div><span>Localização</span><p>Chã de Cemitério,<br />Rua do Campo de Amarante</p></div>
          <div><span>Atendimento</span><p>Seg — Qui: 07h–22h<br />Sex: 07h–23h<br />Sáb: 09h–23h<br />Dom: 09h–22h</p></div>
          <div><span>Contato</span><p><a href="tel:+2382323239">+238 232 32 39</a><br /><a href="tel:+2389709250">+238 970 92 50</a></p></div>
          <div><span>Siga-nos</span><SocialLinks /></div>
        </div>
        <div className="footer-bottom"><span>© Copyright {new Date().getFullYear()} – Chez Dany by <a className="gs-link" href="https://wa.me/2389996056" target="_blank" rel="noreferrer">GS STUDIO</a></span><span>Sabores di nós terra</span></div>
      </footer>
      <ScrollTop />
    </main>
  )
}
