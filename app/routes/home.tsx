import type { Route } from "./+types/home";
import { useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Luna's Bakery - Artisan Cakes & Pastries" },
		{ name: "description", content: "Our cakes taste as good as they look. Choose from our designs, or create your own custom masterpiece." },
	];
}

export default function Home() {
	const observerRef = useRef<IntersectionObserver | null>(null);

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

		return () => observerRef.current?.disconnect();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
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

				@keyframes float {
					0%, 100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-10px);
					}
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
			`}</style>

			{/* Hero Section with Integrated Navigation */}
			<section className="relative h-screen">
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10" />
				<img
					src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
					alt="Beautiful celebration cake"
					className="absolute inset-0 w-full h-full object-cover"
				/>

				{/* Navigation integrated into hero */}
				<nav className="relative z-30 pt-8">
					<div className="max-w-5xl mx-auto px-4">
						<div className="flex flex-col items-center space-y-6">
							<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
								Luna's Bakery
							</h1>
							<div className="hidden md:flex space-x-8">
								<a href="#cakes" className="nav-link text-white/90 hover:text-white font-medium">Cakes</a>
								<a href="#wedding" className="nav-link text-white/90 hover:text-white font-medium">Wedding Cakes</a>
								<a href="#dessert-tables" className="nav-link text-white/90 hover:text-white font-medium">Dessert Tables</a>
								<a href="#custom" className="nav-link text-white/90 hover:text-white font-medium">Custom Cakes</a>
								<a href="#order" className="nav-link text-white/90 hover:text-white font-medium">Order Now</a>
							</div>
						</div>
					</div>
				</nav>

				<div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 -mt-32">
					<h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
						Luna's Bakery
					</h2>
					<p className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
						Our cakes taste as good as they look. Choose from our designs, or create your own!
					</p>
					<a
						href="#order"
						className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
					>
						Order Now
					</a>
				</div>
			</section>

			{/* Category Sections */}
			<section id="cakes" className="py-20 px-4 bg-gradient-to-b from-transparent to-amber-50/50">
				<div className="max-w-7xl mx-auto">
					<h3 className="text-4xl font-bold text-center mb-4 text-amber-900 scroll-reveal">Birthday Cakes</h3>
					<p className="text-center text-amber-800/80 mb-12 max-w-2xl mx-auto scroll-reveal">
						Celebrate life's special moments with our handcrafted birthday cakes, designed to make every celebration unforgettable.
					</p>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop"
								alt="Birthday cake"
								className="w-full h-96 object-cover"
							/>
						</div>
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=600&fit=crop"
								alt="Colorful birthday cake"
								className="w-full h-96 object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			<section id="wedding" className="py-20 px-4 bg-gradient-to-b from-amber-50/50 via-rose-50/40 to-orange-50/30">
				<div className="max-w-7xl mx-auto">
					<h3 className="text-4xl font-bold text-center mb-4 text-rose-900 scroll-reveal">Wedding Cakes</h3>
					<p className="text-center text-rose-800/80 mb-12 max-w-2xl mx-auto scroll-reveal">
						Elegant, stunning, and delicious. Our wedding cakes are the centerpiece your special day deserves.
					</p>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop"
								alt="Elegant wedding cake"
								className="w-full h-96 object-cover"
							/>
						</div>
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop"
								alt="White wedding cake"
								className="w-full h-96 object-cover"
							/>
						</div>
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1562440499-64c9a4d3d5bb?w=800&h=800&fit=crop"
								alt="Tiered wedding cake"
								className="w-full h-96 object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			<section id="dessert-tables" className="py-20 px-4 bg-gradient-to-b from-orange-50/30 to-amber-100/40">
				<div className="max-w-7xl mx-auto">
					<h3 className="text-4xl font-bold text-center mb-4 text-orange-900 scroll-reveal">Dessert Tables</h3>
					<p className="text-center text-orange-800/80 mb-12 max-w-2xl mx-auto scroll-reveal">
						Create a stunning display with our curated dessert tables, perfect for any celebration.
					</p>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop"
								alt="Dessert table display"
								className="w-full h-96 object-cover"
							/>
						</div>
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop"
								alt="Assorted pastries"
								className="w-full h-96 object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			<section id="custom" className="py-20 px-4 bg-gradient-to-b from-amber-100/40 to-rose-100/30">
				<div className="max-w-7xl mx-auto">
					<h3 className="text-4xl font-bold text-center mb-4 text-amber-900 scroll-reveal">Custom Cakes</h3>
					<p className="text-center text-amber-800/80 mb-12 max-w-2xl mx-auto scroll-reveal">
						Dream it, and we'll create it. Our custom cakes bring your vision to life with artistic precision.
					</p>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&h=600&fit=crop"
								alt="Custom designed cake"
								className="w-full h-96 object-cover"
							/>
						</div>
						<div className="scroll-reveal overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500">
							<img
								src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&h=600&fit=crop"
								alt="Artistic custom cake"
								className="w-full h-96 object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Order Now Section */}
			<section id="order" className="py-20 px-4 bg-gradient-to-b from-rose-100/30 to-amber-50">
				<div className="max-w-4xl mx-auto text-center">
					<h3 className="text-4xl font-bold mb-6 text-amber-900 scroll-reveal">Ready to Order?</h3>
					<p className="text-amber-800/80 mb-8 text-lg scroll-reveal">
						Contact us today to discuss your dream cake or visit us at our bakery.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 scroll-reveal">
						<a
							href="tel:+15555551234"
							className="bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-900 transition shadow-lg transform hover:scale-105"
						>
							Call Us: (555) 555-1234
						</a>
						<a
							href="mailto:orders@lunasbakery.com"
							className="border-2 border-amber-800 text-amber-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition shadow-lg transform hover:scale-105"
						>
							Email Us
						</a>
					</div>

					{/* Map */}
					<div className="mt-12 scroll-reveal">
						<h4 className="text-2xl font-bold mb-4 text-amber-900">Visit Our Bakery</h4>
						<p className="text-amber-800/80 mb-6">
							123 Sweet Street, Bakery District<br />
							San Francisco, CA 94102<br />
							Open Daily: 10am - 7pm
						</p>
						<div className="w-full h-96 bg-amber-100 rounded-2xl overflow-hidden shadow-2xl">
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
			<footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-white py-12 px-4">
				<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
					<div>
						<h5 className="text-xl font-bold mb-4 text-amber-100">Luna's Bakery</h5>
						<p className="text-amber-200/70">
							Crafting delicious memories since 2024.
						</p>
					</div>
					<div>
						<h5 className="text-xl font-bold mb-4 text-amber-100">Contact</h5>
						<p className="text-amber-200/70">
							123 Sweet Street<br />
							San Francisco, CA 94102<br />
							Phone: (555) 555-1234<br />
							Email: orders@lunasbakery.com
						</p>
					</div>
					<div>
						<h5 className="text-xl font-bold mb-4 text-amber-100">Hours</h5>
						<p className="text-amber-200/70">
							Monday - Sunday<br />
							10:00 AM - 7:00 PM
						</p>
						<div className="flex space-x-4 mt-4">
							<a href="#" className="text-amber-200/70 hover:text-amber-100 transition transform hover:scale-110">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</a>
							<a href="#" className="text-amber-200/70 hover:text-amber-100 transition transform hover:scale-110">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
				<div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-amber-800/50 text-center text-amber-200/70">
					<p>&copy; 2024 Luna's Bakery. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
