/* eslint-disable @next/next/no-img-element */
export default function ProductCard({product}){
    const text = product.name.length>20 ? product.name.substring(0, 20) + "..." : product.name;
    const discount = Number(product.s_price)
    let price = Number(product.price)
    if(discount > 0){
        price = price - (price * discount / 100)
    }
    return(
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300">
            <img src={`/api/productCardImage?id=${product._id}`} alt={product.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
            <h3 className="text-lg font-semibold capitalize text-clip truncate max-w-xs" title={product.name}>{text}</h3>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-l font-bold text-gray-800">₹ {discount?<><div className="diagonal-text relative inline">{product.price}</div> {price}</>:`${product.price}`} </span>
                    <a
                        href={`/product/${product._id}`}
                        className="bg-gray-800 text-white font-semibold py-1 px-4 rounded"
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    )
}