import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/cart";
import { formatCurrencyToIDR } from "../../../utils/formatters";

const ProductCard = ({ product }) => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const defaultImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIWWfFTRYMVjQrrO5EoSVcOQVyhmXCtQAglQ&s";

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={product.product_image || defaultImageUrl}
        alt={product.product_name}
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{product.product_name}</h2>
        <p className="text-lg text-green-600 mb-2">
          {formatCurrencyToIDR(product.product_price)}
        </p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="mt-4">
          <span className="text-sm font-semibold text-gray-800">
            {product.Category.category_name}
          </span>
        </div>
        <div className="mt-4 flex space-x-2">
          {!isAdmin && (
            <button
              onClick={handleAddToCart}
              className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
