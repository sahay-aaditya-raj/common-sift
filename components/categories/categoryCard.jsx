/* eslint-disable @next/next/no-img-element */
export default function CategoryCard({ product, isCenter }) {
    return (
        <div
            className={`bg-white shadow-md rounded-lg overflow-hidden transform transition-all ${isCenter ? 'scale-102' : 'scale-95'} w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`}
        >
            <img
                src={`/api/productCardImage?id=${product._id}`}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold capitalize">{product.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">₹ {product.price}</span>
                    <a
                        href={`/product/${product._id}`}
                        className="bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700"
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
}
