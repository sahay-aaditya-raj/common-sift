import { useEffect, useState } from "react";

export default function Content({ data }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <div className="p-2">
      <h1 className="font-bold text-[30px] capitalize">{data?.name}</h1>
      <div>
        <p className="text-[25px] text-gray-600">Price: ₹{data?.price}</p>
        <p className="text-[25px] text-gray-600">Category: {data?.category}</p>
        <p className="text-[25px] text-gray-600">Description: {data?.desc}</p>
      </div>
      <div>
        To place order, share the URL to <a className="underline">{url}</a>
      </div>
    </div>
  );
}
