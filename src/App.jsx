import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Cloudline Lounge Chair',
    category: 'Furniture',
    price: 489,
    color: 'Oatmeal boucle',
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Forma Ceramic Vase',
    category: 'Objects',
    price: 68,
    color: 'Warm white',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Everyday Linen Throw',
    category: 'Textiles',
    price: 124,
    color: 'Sage stripe',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Arc Table Light',
    category: 'Lighting',
    price: 215,
    color: 'Brushed brass',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Sunday Stoneware Set',
    category: 'Objects',
    price: 92,
    color: 'Chalk, set of 2',
    badge: 'Small batch',
    image:
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'Soft Form Side Table',
    category: 'Furniture',
    price: 340,
    color: 'Natural oak',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85',
  },
]

const categories = ['All pieces', 'Furniture', 'Objects', 'Textiles', 'Lighting']

function Icon({ name, className = 'h-5 w-5' }) {
  const shared = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.6,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  if (name === 'search') {
    return (
      <svg {...shared}>
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m16 16 4 4" />
      </svg>
    )
  }
  if (name === 'bag') {
    return (
      <svg {...shared}>
        <path d="M5 8h14l1 12H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    )
  }
  if (name === 'heart') {
    return (
      <svg {...shared}>
        <path d="M20.3 8.6c0 5.1-8.3 10-8.3 10s-8.3-4.9-8.3-10a4.3 4.3 0 0 1 8.3-1.5 4.3 4.3 0 0 1 8.3 1.5Z" />
      </svg>
    )
  }
  if (name === 'arrow') {
    return (
      <svg {...shared}>
        <path d="M4 12h15m-6-6 6 6-6 6" />
      </svg>
    )
  }
  if (name === 'menu') {
    return (
      <svg {...shared}>
        <path d="M4 8h16M4 16h16" />
      </svg>
    )
  }
  return null
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All pieces' || product.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  function addToBag(productName) {
    setCartCount((count) => count + 1)
    setNotice(`${productName} added to your bag`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  function handleSubscribe(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-[#f9f8f5] text-[#25271f]">
      <div className="bg-[#343d32] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
        Thoughtful things for slower living <span className="mx-2 text-[#c7cebf]">·</span>{' '}
        Complimentary shipping over $150
      </div>

      <header className="relative z-10 border-b border-[#e9e7e0] bg-[#f9f8f5]">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <button
            className="rounded-full p-2 text-[#343d32] transition hover:bg-[#eeede6] md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <Icon name="menu" />
          </button>
          <nav className="hidden items-center gap-8 md:flex">
            {['Shop', 'Our story', 'Journal'].map((item) => (
              <a
                className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#5f6258] transition hover:text-[#25271f]"
                href={item === 'Shop' ? '#shop' : item === 'Our story' ? '#story' : '#journal'}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#top"
            className="absolute left-1/2 -translate-x-1/2 text-center text-[20px] font-semibold tracking-[0.2em] text-[#343d32] sm:text-[22px]"
            aria-label="Stillform home"
          >
            STILLFORM<span className="text-[#a8ad9d]">.</span>
          </a>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            {searchOpen && (
              <input
                autoFocus
                className="w-28 border-b border-[#b9bbae] bg-transparent py-1 text-xs outline-none placeholder:text-[#94958b] sm:w-40"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find something..."
                value={query}
                aria-label="Search products"
              />
            )}
            <button
              className="rounded-full p-2 transition hover:bg-[#eeede6]"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? 'Close search' : 'Search products'}
            >
              <Icon name="search" />
            </button>
            <button
              className="flex items-center gap-2 rounded-full p-2 transition hover:bg-[#eeede6]"
              onClick={() => {
                setNotice(
                  cartCount
                    ? `Your bag has ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`
                    : 'Your bag is feeling a little light',
                )
                window.setTimeout(() => setNotice(''), 2600)
              }}
              aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <Icon name="bag" />
              <span className="hidden text-[11px] uppercase tracking-[0.12em] sm:inline">
                Bag ({cartCount})
              </span>
              <span className="sr-only">({cartCount} items)</span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t border-[#e9e7e0] px-6 py-4 md:hidden" aria-label="Mobile navigation">
            {['Shop', 'Our story', 'Journal'].map((item) => (
              <a
                className="block py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#5f6258]"
                href={item === 'Shop' ? '#shop' : item === 'Our story' ? '#story' : '#journal'}
                key={item}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-8 sm:pt-7 lg:px-14">
          <div className="relative flex min-h-[520px] items-end overflow-hidden bg-[#d9d5c8] sm:min-h-[590px] lg:min-h-[650px]">
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
              alt="Sunlit, thoughtfully styled living room in warm natural tones"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#24271f]/65 via-[#24271f]/20 to-transparent" />
            <div className="relative max-w-xl px-7 pb-12 pt-20 text-white sm:px-12 sm:pb-16 lg:px-16 lg:pb-20">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 sm:text-[11px]">
                A home, more your own
              </p>
              <h1 className="max-w-[540px] font-serif text-[48px] leading-[0.98] tracking-[-0.04em] sm:text-[66px] lg:text-[76px]">
                Keep what
                <br />
                feels like you.
              </h1>
              <p className="mt-5 max-w-[340px] text-sm leading-6 text-white/85 sm:text-[15px]">
                Considered pieces, made to live with. Find the little things that make a
                space feel like yours.
              </p>
              <a
                className="mt-8 inline-flex items-center gap-4 bg-[#f9f8f5] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#30372e] transition hover:bg-white"
                href="#shop"
              >
                Find your something <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
            <div className="absolute bottom-6 right-7 hidden text-[9px] uppercase tracking-[0.2em] text-white/75 sm:block">
              Objects for the everyday, and everything in between
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24" id="shop">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#84877c]">
                Made for the everyday
              </p>
              <h2 className="font-serif text-[36px] leading-none tracking-[-0.035em] sm:text-[44px]">
                The considered edit
              </h2>
            </div>
            <a
              className="group inline-flex items-center gap-2 self-start text-[10px] font-semibold uppercase tracking-[0.16em] sm:self-auto"
              href="#newsletter"
            >
              A little more about us
              <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mb-7 flex gap-2 overflow-x-auto pb-2 sm:mb-8 sm:gap-3">
            {categories.map((category) => (
              <button
                className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.13em] transition sm:px-5 ${
                  activeCategory === category
                    ? 'border-[#343d32] bg-[#343d32] text-white'
                    : 'border-[#ddddd5] text-[#62655c] hover:border-[#85897b]'
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
            <span className="ml-auto hidden self-center text-[10px] uppercase tracking-[0.13em] text-[#8c8d84] sm:block">
              {filteredProducts.length} pieces
            </span>
          </div>

          {filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-7">
              {filteredProducts.map((product, index) => (
                <article className="group" key={product.id}>
                  <div className="relative aspect-[0.82] overflow-hidden bg-[#eeede7] sm:aspect-[0.91]">
                    <img
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                      src={product.image}
                      alt={product.name}
                      loading={index > 2 ? 'lazy' : 'eager'}
                    />
                    {product.badge && (
                      <span className="absolute left-3 top-3 bg-[#f9f8f5] px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#45493f] sm:left-4 sm:top-4 sm:text-[9px]">
                        {product.badge}
                      </span>
                    )}
                    <button
                      className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#f9f8f5]/90 transition hover:bg-white sm:right-4 sm:top-4 ${
                        favorites.includes(product.id) ? 'text-[#a45f4d]' : 'text-[#45493f]'
                      }`}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={
                        favorites.includes(product.id)
                          ? `Remove ${product.name} from favorites`
                          : `Add ${product.name} to favorites`
                      }
                      aria-pressed={favorites.includes(product.id)}
                    >
                      <Icon
                        name="heart"
                        className={`h-[17px] w-[17px] ${
                          favorites.includes(product.id) ? 'fill-current' : ''
                        }`}
                      />
                    </button>
                    <button
                      className="absolute inset-x-0 bottom-0 translate-y-full bg-[#f9f8f5] px-4 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-y-0 focus:translate-y-0 sm:text-[10px]"
                      onClick={() => addToBag(product.name)}
                    >
                      Add to bag <span className="ml-1">·</span> ${product.price}
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-2 pt-3 sm:pt-4">
                    <div>
                      <p className="text-[12px] font-medium sm:text-[14px]">{product.name}</p>
                      <p className="mt-1 text-[10px] text-[#85877d] sm:text-[11px]">
                        {product.color}
                      </p>
                    </div>
                    <p className="pt-0.5 text-[11px] sm:text-[13px]">${product.price}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl">Nothing here just yet.</p>
              <p className="mt-2 text-sm text-[#77796f]">Try another search or browse all pieces.</p>
              <button
                className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All pieces')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section
          className="mx-auto grid max-w-[1440px] bg-[#e9e8df] md:grid-cols-2"
          id="story"
        >
          <div className="flex min-h-[340px] flex-col justify-center px-7 py-12 sm:px-12 md:order-2 md:px-16 lg:px-24">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.21em] text-[#74786b]">
              Less, but more meaningful
            </p>
            <h2 className="max-w-lg font-serif text-[38px] leading-[1.04] tracking-[-0.035em] sm:text-[48px]">
              Good things take their time.
            </h2>
            <p className="mt-5 max-w-md text-[13px] leading-6 text-[#65685e]">
              We work with independent makers who care about how things are made, and how
              they feel years from now. Fewer things. Better stories.
            </p>
            <a
              className="group mt-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em]"
              href="#newsletter"
            >
              Get to know us
              <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
          <div className="min-h-[300px] overflow-hidden md:order-1 md:min-h-[500px]">
            <img
              className="h-full min-h-[300px] w-full object-cover md:min-h-[500px]"
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
              alt="Quiet, tactile details in a naturally styled home"
              loading="lazy"
            />
          </div>
        </section>

        <section
          className="mx-auto max-w-[1440px] px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24"
          id="journal"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#84877c]">
            A note from us
          </p>
          <h2 className="mx-auto max-w-xl font-serif text-[34px] leading-tight tracking-[-0.035em] sm:text-[42px]">
            Make room for the things that matter.
          </h2>
          <a
            className="group mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em]"
            href="#newsletter"
          >
            Read our journal
            <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </section>
      </main>

      <footer className="bg-[#343d32] text-[#f9f8f5]" id="newsletter">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-20">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#c2c7ba]">
              The occasional good thing
            </p>
            <h2 className="max-w-lg font-serif text-[34px] leading-tight tracking-[-0.03em] sm:text-[42px]">
              A slower kind of inbox.
            </h2>
            <p className="mt-3 max-w-md text-[12px] leading-6 text-[#d0d2c9]">
              New finds, maker stories, and little notes on making home your own. No noise.
            </p>
            <form className="mt-6 flex max-w-md border-b border-white/40" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
              <input
                className="min-w-0 flex-1 bg-transparent py-3 text-[12px] text-white outline-none placeholder:text-white/60"
                id="newsletter-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                type="email"
                value={email}
                required
              />
              <button
                className="group flex items-center gap-2 pl-3 text-[9px] font-semibold uppercase tracking-[0.15em] sm:text-[10px]"
                type="submit"
              >
                {subscribed ? 'You’re on the list' : 'Count me in'}
                {!subscribed && (
                  <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                )}
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 text-[11px] text-[#d0d8c7]" role="status">
                Thank you — keep an eye on your inbox.
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-[0.14em] sm:justify-self-end sm:gap-16">
            <div className="flex flex-col gap-4">
              <p className="mb-1 text-[#c2c7ba]">Explore</p>
              <a className="hover:text-white/70" href="#shop">Shop all</a>
              <a className="hover:text-white/70" href="#story">Our story</a>
              <a className="hover:text-white/70" href="#journal">Journal</a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="mb-1 text-[#c2c7ba]">Say hello</p>
              <a className="hover:text-white/70" href="mailto:hello@stillform.example">
                Get in touch
              </a>
              <a className="hover:text-white/70" href="#newsletter">Instagram</a>
              <a className="hover:text-white/70" href="#newsletter">Shipping & returns</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-[9px] uppercase tracking-[0.13em] text-white/65 sm:flex-row sm:justify-between sm:px-8 lg:px-14">
            <p>© {new Date().getFullYear()} Stillform Studio. Made to feel like home.</p>
            <p>Thoughtfully made, wherever you are.</p>
          </div>
        </div>
      </footer>

      <div
        className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 bg-[#25271f] px-5 py-3 text-center text-xs text-white shadow-xl transition-all ${
          notice ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </div>
  )
}

export default App
