import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luna's Bakery - Artisan Cakes & Pastries" },
    { name: "description", content: "Our cakes taste as good as they look. Choose from our designs, or create your own custom masterpiece." },
  ];
}

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showOrderButton, setShowOrderButton] = useState(false);
  const [hideOrderButton, setHideOrderButton] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    // Handle sticky order button visibility
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      const orderSection = document.querySelector('#order');

      if (heroSection && orderSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const orderTop = orderSection.getBoundingClientRect().top;

        setShowOrderButton(heroBottom < 0);
        setHideOrderButton(orderTop < window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Emoji physics engine
    const emojis = ['🥐', '🧁', '🎂', '🍰'];
    const activeEmojis: Array<{
      element: HTMLDivElement;
      x: number;
      y: number;
      velocityY: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const createEmoji = (x: number, y: number) => {
      const orderSection = document.querySelector('#order');
      if (orderSection) {
        const orderRect = orderSection.getBoundingClientRect();
        // Don't create emojis if cursor is in or below order section
        if (y >= orderRect.top + window.scrollY) return;
      }

      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'absolute';
      emoji.style.left = `${x}px`;
      emoji.style.top = `${y + window.scrollY}px`;
      emoji.style.fontSize = '24px';
      emoji.style.pointerEvents = 'none';
      emoji.style.zIndex = '9999';
      emoji.style.opacity = '1';
      document.body.appendChild(emoji);

      activeEmojis.push({
        element: emoji,
        x,
        y: y + window.scrollY,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 4
      });
    };

    // Physics loop
    const gravity = 0.2;
    const bounce = 0.2;
    const friction = 0.97;

    const updateEmojis = () => {
      const floorY = document.documentElement.clientHeight - 50;

      for (let i = activeEmojis.length - 1; i >= 0; i--) {
        const emojiObj = activeEmojis[i];

        // Apply gravity
        emojiObj.velocityY += gravity;
        emojiObj.y += emojiObj.velocityY;
        emojiObj.rotation += emojiObj.rotationSpeed;

        // Floor collision with bounce
        if (emojiObj.y >= floorY) {
          emojiObj.y = floorY;
          emojiObj.velocityY *= -bounce;
          emojiObj.rotationSpeed *= friction;

          // Remove if barely moving
          if (Math.abs(emojiObj.velocityY) < 0.5) {
            emojiObj.element.remove();
            activeEmojis.splice(i, 1);
            continue;
          }
        }

        // Update element position
        emojiObj.element.style.transform = `translate(0, ${emojiObj.y - (emojiObj.y + window.scrollY)}px) rotate(${emojiObj.rotation}deg)`;
        emojiObj.element.style.top = `${emojiObj.y}px`;
      }

      requestAnimationFrame(updateEmojis);
    };

    updateEmojis();

    const handleClick = (e: MouseEvent) => {
      // Don't create emoji if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const orderSection = document.querySelector('#order');
      if (orderSection) {
        const orderRect = orderSection.getBoundingClientRect();
        if (e.clientY >= orderRect.top) return;
      }

      createEmoji(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      // Clean up emojis
      activeEmojis.forEach(emojiObj => emojiObj.element.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-rose-100">
      <style>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(40px) scale(0.95);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}

				@keyframes rainbow {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}

				.scroll-reveal {
					opacity: 0;
					transform: translateY(40px) scale(0.95);
					transition: opacity 0.8s ease-out, transform 0.8s ease-out;
				}

				.scroll-reveal.animate-in {
					animation: fadeInUp 0.8s ease-out forwards;
				}

				.nav-link {
					position: relative;
					transition: all 0.3s ease;
				}

				.nav-link::after {
					content: '';
					position: absolute;
					bottom: -4px;
					left: 50%;
					width: 0;
					height: 2px;
					background: rgba(255, 255, 255, 0.8);
					transition: all 0.3s ease;
					transform: translateX(-50%);
				}

				.nav-link:hover::after {
					width: 100%;
				}

				.nav-link:hover {
					transform: translateY(-2px);
				}

				.rainbow-button {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
					background-size: 200% 200%;
					transition: all 0.5s ease;
				}

				.rainbow-button:hover {
					background: linear-gradient(135deg, #ff6b6b 0%, #feca57 20%, #48dbfb 40%, #1dd1a1 60%, #ee5a6f 80%, #c44569 100%);
					background-size: 400% 400%;
					animation: rainbow 10s ease infinite;
					transform: scale(1.05);
					box-shadow: 0 10px 30px rgba(0,0,0,0.3);
				}

				/* Mobile sticky button - fade in from right */
				@media (max-width: 1023px) {
					.sticky-order-button {
						animation: slideInMobile 0.5s ease-out;
					}

					@keyframes slideInMobile {
						from {
							transform: translateX(50px);
							opacity: 0;
						}
						to {
							transform: translateX(0);
							opacity: 1;
						}
					}

					.sticky-order-button.hide {
						animation: slideOutMobile 0.3s ease-in forwards;
					}

					@keyframes slideOutMobile {
						to {
							transform: translateX(50px);
							opacity: 0;
						}
					}
				}

				/* Desktop sticky button - bounce down like a frog */
				@media (min-width: 1024px) {
					.sticky-order-button {
						animation: frogBounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
					}

					@keyframes frogBounce {
						0% {
							transform: translateY(-300px) translateX(0);
							opacity: 0;
						}
						40% {
							transform: translateY(20px) translateX(0);
							opacity: 1;
						}
						55% {
							transform: translateY(-10px) translateX(0);
						}
						70% {
							transform: translateY(5px) translateX(0);
						}
						85% {
							transform: translateY(-3px) translateX(0);
						}
						100% {
							transform: translateY(0) translateX(0);
							opacity: 1;
						}
					}

					.sticky-order-button.hide {
						animation: fadeOutUp 0.4s ease-in forwards;
					}

					@keyframes fadeOutUp {
						to {
							transform: translateY(-100px) translateX(25%);
							opacity: 0;
						}
					}
				}
			`}</style>

      {/* Sticky Order Button */}
      {showOrderButton && !hideOrderButton && (
        <a
          href="#order"
          className={`fixed bottom-8 right-4 lg:right-15 lg:translate-x-1 z-50 rainbow-button text-white px-6 py-3 lg:px-10 lg:py-5 rounded-full font-bold shadow-2xl sticky-order-button text-sm lg:text-xl`}
        >
          Order Now
        </a>
      )}

      {/* Hero Section with Integrated Navigation */}
      <section className="hero-section relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1567891026259-c133718572a4?&w=1920&h=1080&fit-crop"
          alt="Beautiful celebration cake"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Curved cut effect with SVG */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#fce7f3" fillOpacity="0.9" />
            <path d="M0,80L80,82.7C160,85,320,91,480,88C640,85,800,75,960,72C1120,69,1280,75,1360,77.3L1440,80L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#fce7f3" />
          </svg>
        </div>

        {/* Navigation integrated into hero */}
        <nav className="relative z-30 pt-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center space-y-6">
              {/* Logo placeholder */}
              <img
                src="https://placehold.co/150x60/ff1744/ffffff?text=Luna's+Club+LOGO"
                alt="Luna's Bake Club Logo"
                className="h-16 drop-shadow-lg"
              />
              <div className="hidden md:flex space-x-8">
                <a href="#pastel-pisos" className="nav-link text-white/90 hover:text-white font-medium">Pastel Pisos</a>
                <a href="#pastel-circular" className="nav-link text-white/90 hover:text-white font-medium">Pastel Circular</a>
                <a href="#pastel-corazon" className="nav-link text-white/90 hover:text-white font-medium">Pastel Corazón</a>
                <a href="#cupcakes" className="nav-link text-white/90 hover:text-white font-medium">Cupcakes</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 -mt-32">
          <p className="text-xl md:text-2xl mb-2 drop-shadow-md font-light">Welcome to</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg" style={{ color: '#ff1744' }}>
            Luna's Bake Club
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl drop-shadow-md">
            Our cakes taste as good as they look. Choose from our designs, or create your own!
          </p>
          <a
            href="#order"
            className="rainbow-button text-white px-10 py-4 rounded-full font-bold shadow-2xl text-lg"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Category Sections */}
      <section id="pastel-pisos" className="py-20 px-4 bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 text-pink-900 scroll-reveal">Pastel Pisos</h3>
          <p className="text-center text-pink-800/90 mb-12 max-w-2xl mx-auto scroll-reveal">
            Pasteles de varios pisos perfectos para celebraciones grandes. Deliciosos y elegantes.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop"
                alt="Pastel de pisos"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=600&fit=crop"
                alt="Pastel colorido de pisos"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pastel-circular" className="py-20 px-4 bg-gradient-to-b from-purple-200 via-violet-200 to-fuchsia-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 text-purple-900 scroll-reveal">Pastel Circular</h3>
          <p className="text-center text-purple-800/90 mb-12 max-w-2xl mx-auto scroll-reveal">
            Pasteles circulares clásicos, perfectos para cualquier ocasión especial.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop"
                alt="Pastel circular elegante"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop"
                alt="Pastel circular blanco"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop"
                alt="Pastel circular de varios niveles"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pastel-corazon" className="py-20 px-4 bg-gradient-to-b from-fuchsia-200 via-pink-200 to-rose-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 text-pink-900 scroll-reveal">Pastel Corazón</h3>
          <p className="text-center text-pink-800/90 mb-12 max-w-2xl mx-auto scroll-reveal">
            Pasteles en forma de corazón, ideales para expresar tu amor en ocasiones especiales.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop"
                alt="Pastel de corazón"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop"
                alt="Pastel romántico"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="cupcakes" className="py-20 px-4 bg-gradient-to-b from-rose-200 via-orange-200 to-amber-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 text-orange-900 scroll-reveal">Cupcakes</h3>
          <p className="text-center text-orange-800/90 mb-12 max-w-2xl mx-auto scroll-reveal">
            Cupcakes deliciosos en una variedad de sabores y diseños personalizados.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&h=600&fit=crop"
                alt="Cupcakes personalizados"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&h=600&fit=crop"
                alt="Cupcakes artísticos"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Order Now Section */}
      <section id="order" className="py-20 px-4 bg-gradient-to-b from-orange-200 to-pink-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 text-pink-900 scroll-reveal text-center">Ready to Order?</h3>
          <p className="text-pink-800/90 mb-12 text-lg scroll-reveal text-center max-w-2xl mx-auto">
            Fill out the form below to place your custom order!
          </p>

          {/* Order Form */}
          <form className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 scroll-reveal">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Text Fields */}
              <div>
                <label className="block text-pink-900 font-semibold mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none transition" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-pink-900 font-semibold mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none transition" placeholder="(555) 555-5555" />
              </div>
              <div>
                <label className="block text-pink-900 font-semibold mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none transition" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-pink-900 font-semibold mb-2">Event Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none transition" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-pink-900 font-semibold mb-2">Special Instructions</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none transition resize-none" placeholder="Tell us about your dream cake..."></textarea>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mb-6">
              <h4 className="text-pink-900 font-bold text-xl mb-4">Cake Options</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Chocolate Flavor</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Vanilla Flavor</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Strawberry Flavor</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Red Velvet</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Custom Topper</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Fresh Flowers</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Fondant Covering</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Buttercream Frosting</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Gluten-Free Option</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-400" />
                  <span className="text-pink-900">Multiple Tiers</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <a
                href="/order-confirmation"
                className="rainbow-button text-white px-12 py-4 rounded-full font-bold shadow-2xl text-lg inline-block"
              >
                Submit Order
              </a>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 scroll-reveal">
            <a
              href="tel:+15555551234"
              className="rainbow-button text-white px-8 py-3 rounded-full font-bold shadow-lg text-center"
            >
              Call Us: (555) 555-1234
            </a>
            <a
              href="mailto:orders@lunasbakery.com"
              className="border-2 border-pink-800 text-pink-900 px-8 py-3 rounded-full font-semibold hover:bg-pink-800 hover:text-white transition shadow-lg transform hover:scale-105 text-center"
            >
              Email Us
            </a>
          </div>

          {/* Map */}
          <div className="mt-12 scroll-reveal">
            <h4 className="text-2xl font-bold mb-4 text-pink-900">Visit Our Bakery</h4>
            <p className="text-pink-800/90 mb-6">
              123 Sweet Street, Bakery District<br />
              San Francisco, CA 94102<br />
              Open Daily: 10am - 7pm
            </p>
            <div className="w-full h-96 bg-pink-100 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019363155941!2d-122.41941492348039!3d37.78583971110522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sUnion%20Square%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1733441200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luna's Bakery Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-purple-900 to-indigo-950 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4 text-purple-100">Luna's Bakery</h5>
            <p className="text-purple-200/70">
              Crafting delicious memories since 2024.
            </p>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4 text-purple-100">Contact</h5>
            <p className="text-purple-200/70">
              123 Sweet Street<br />
              San Francisco, CA 94102<br />
              Phone: (555) 555-1234<br />
              Email: orders@lunasbakery.com
            </p>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4 text-purple-100">Hours</h5>
            <p className="text-purple-200/70">
              Monday - Sunday<br />
              10:00 AM - 7:00 PM
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-purple-200/70 hover:text-purple-100 transition transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-purple-200/70 hover:text-purple-100 transition transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-purple-800/50 text-center text-purple-200/70">
          <p>&copy; 2024 Luna's Bake Club. Vuelve pronto!</p>
        </div>
      </footer>
    </div>
  );
}
