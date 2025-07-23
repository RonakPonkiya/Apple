
import { Link } from "react-router-dom";
import HeroCarousel from "../components/Carousel";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-800 font-[Roboto]">

      <section className="mt-4 px-4 max-w-6xl mx-auto">
        <HeroCarousel />
      </section>
      <section className="text-center px-6 mt-16">
        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-800 leading-tight">
          Your Gateway to Smart Shopping
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl">
          Find premium products, manage your listings, and experience seamless buying. Join Apple Rocket to elevate your e-commerce journey.
        </p>
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20 px-6 max-w-6xl mx-auto">
        {[
          {
            title: "Simple UI",
            desc: "Clean and responsive interface that works on all devices."
          },
          {
            title: "Fast Management",
            desc: "Easily manage products with intuitive controls."
          },
          {
            title: "Secure Login",
            desc: "We use local storage securely to maintain sessions."
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition-all border border-gray-100"
          >
            <h4 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
     
        <section className="mt-20 px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Manage Your Products</h3>
          <Link
            to="/products"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
          >
            Go to Product Dashboard
          </Link>
        </section>

      <footer className="mt-24 py-6 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Apple Rocket. Crafted with care. 🚀
      </footer>
    </div>
  );
};

export default HomePage;