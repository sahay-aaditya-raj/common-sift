import { useEffect, useState } from 'react';

export default function Content({ data }) {
  const [url, setUrl] = useState('');

  const discount = Number(data?.s_price)
  let price = Number(data?.price)
  if(discount > 0){
      price = price - (price * discount / 100)
  }
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = `https://wa.me/918092811097?text=Order%20${window.location.href}`;
      setUrl(u);
    }
  }, []);

  return (
    <div className="p-2">
      <h1 className="font-bold text-2xl capitalize">{data?.name}</h1>
      <div className="mt-2">
        <p className="text-lg text-gray-600">Price: ₹ {discount?
          <>
            <div className="diagonal-text relative inline">{data.price}</div><div className='ms-2 inline font-bold'>{price}</div>  <div className='font-bold text-red-600'>{discount}% off</div></>
          :`${data.price}`}</p>
        <p className="text-lg text-gray-600">Category: {data?.category}</p>
        <p className="text-lg text-gray-600">Description: {data?.desc}</p>
      </div>
      <div className="mt-4">
        To place an order <a className="underline rounded font-extrabold text-green-600" target="_blank" rel="noopener noreferrer" href={url}>click here</a> or share the URL to:{' '}
      </div>
    </div>
  );
}
