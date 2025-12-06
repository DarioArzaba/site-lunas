import type { Route } from "./+types/order-confirmation";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Order Confirmation - Luna's Bakery" },
		{ name: "description", content: "Your order confirmation and scheduling details." },
	];
}

export default function OrderConfirmation() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-rose-100">
			{/* Header with Go Back Button */}
			<div className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<Link
						to="/"
						className="inline-flex items-center space-x-2 text-pink-900 hover:text-pink-700 transition font-semibold"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						<span>Go Back</span>
					</Link>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 py-12">
				<h1 className="text-5xl font-bold text-center mb-4 text-pink-900">Order Confirmation</h1>
				<p className="text-center text-pink-800/90 mb-12 text-lg">
					Thank you for your order! Please review your details below and schedule your pickup date.
				</p>

				<div className="grid lg:grid-cols-2 gap-8">
					{/* Order Details Form (Locked/Read-only) */}
					<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
						<h2 className="text-3xl font-bold text-pink-900 mb-6">Order Details</h2>

						<div className="space-y-4">
							{/* Customer Information */}
							<div>
								<label className="block text-pink-900 font-semibold mb-2">Full Name</label>
								<div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700">
									Jane Smith
								</div>
							</div>

							<div>
								<label className="block text-pink-900 font-semibold mb-2">Phone Number</label>
								<div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700">
									(555) 123-4567
								</div>
							</div>

							<div>
								<label className="block text-pink-900 font-semibold mb-2">Email</label>
								<div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700">
									jane.smith@email.com
								</div>
							</div>

							<div>
								<label className="block text-pink-900 font-semibold mb-2">Event Date</label>
								<div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700">
									December 25, 2024
								</div>
							</div>

							<div>
								<label className="block text-pink-900 font-semibold mb-2">Special Instructions</label>
								<div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 min-h-[80px]">
									Please add "Happy Birthday Luna" in pink frosting on top.
								</div>
							</div>

							{/* Selected Options */}
							<div>
								<label className="block text-pink-900 font-semibold mb-3">Selected Options</label>
								<div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-300">
									<div className="flex flex-wrap gap-2">
										<span className="bg-pink-200 text-pink-900 px-3 py-1 rounded-full text-sm">Chocolate Flavor</span>
										<span className="bg-pink-200 text-pink-900 px-3 py-1 rounded-full text-sm">Custom Topper</span>
										<span className="bg-pink-200 text-pink-900 px-3 py-1 rounded-full text-sm">Buttercream Frosting</span>
										<span className="bg-pink-200 text-pink-900 px-3 py-1 rounded-full text-sm">Multiple Tiers</span>
									</div>
								</div>
							</div>

							{/* Order Summary */}
							<div className="border-t-2 border-pink-200 pt-4 mt-6">
								<h3 className="text-xl font-bold text-pink-900 mb-3">Order Summary</h3>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-gray-700">Cake Type:</span>
										<span className="font-semibold text-pink-900">Pastel Pisos</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-700">Size:</span>
										<span className="font-semibold text-pink-900">3 Tiers</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-700">Servings:</span>
										<span className="font-semibold text-pink-900">50-60 people</span>
									</div>
									<div className="flex justify-between text-lg font-bold pt-2 border-t border-pink-200">
										<span className="text-pink-900">Estimated Total:</span>
										<span className="text-pink-900">$250.00</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Calendar Widget Placeholder */}
					<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
						<h2 className="text-3xl font-bold text-pink-900 mb-6">Schedule Pickup</h2>

						<div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 min-h-[500px] flex flex-col items-center justify-center">
							{/* Calendar Icon */}
							<svg className="w-32 h-32 text-pink-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>

							<h3 className="text-2xl font-bold text-pink-900 mb-2">Calendar Widget</h3>
							<p className="text-pink-700 text-center mb-4">
								Interactive calendar coming soon!
							</p>

							{/* Mock Calendar Display */}
							<div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
								<div className="text-center mb-4">
									<h4 className="text-xl font-bold text-purple-900">December 2024</h4>
								</div>

								<div className="grid grid-cols-7 gap-2 text-center text-sm">
									{/* Day headers */}
									<div className="font-bold text-gray-600">S</div>
									<div className="font-bold text-gray-600">M</div>
									<div className="font-bold text-gray-600">T</div>
									<div className="font-bold text-gray-600">W</div>
									<div className="font-bold text-gray-600">T</div>
									<div className="font-bold text-gray-600">F</div>
									<div className="font-bold text-gray-600">S</div>

									{/* Calendar days */}
									{Array.from({ length: 31 }, (_, i) => (
										<div
											key={i}
											className={`p-2 rounded-lg ${
												i === 24
													? 'bg-pink-500 text-white font-bold'
													: 'bg-gray-50 text-gray-700 hover:bg-pink-100 cursor-pointer'
											}`}
										>
											{i + 1}
										</div>
									))}
								</div>

								<div className="mt-6 bg-pink-50 p-4 rounded-lg">
									<p className="text-sm text-pink-900 font-semibold">
										Selected: December 25, 2024
									</p>
									<p className="text-xs text-pink-700 mt-1">
										Pickup time: 10:00 AM - 7:00 PM
									</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="mt-8 space-y-4">
							<button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition transform">
								Confirm Order & Schedule
							</button>
							<button className="w-full border-2 border-pink-500 text-pink-900 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition">
								Request Changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
