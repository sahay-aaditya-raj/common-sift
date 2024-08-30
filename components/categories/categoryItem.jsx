import CategoryCard from "./categoryCard";
import Slider from "react-slick";
import { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CoverItem({ title, products }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        slidesToScroll: 1,
        arrows:true,
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
        afterChange: index => setCurrentSlide(index),
        appendDots: dots => (
            <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: currentSlide === i ? "#292929" : "#848484",
                    display: "inline-block",
                    margin: "0 4px",
                    cursor: "pointer",
                }}
            ></div>
        ),
    };

    return (
        <div className="my-4">
            <h1 id={title} className="text-2xl font-bold mb-2">{title}</h1>
            <Slider {...settings}>
                {products?.map((product, i) => {
                    const isCenter = i === currentSlide;
                    return (
                        <div key={i} className="flex justify-center">
                            <CategoryCard product={product} isCenter={isCenter} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

function CustomArrow({ direction, onClick }) {
    return (
        <div
            className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-0 bottom-0 flex items-center justify-center cursor-pointer z-10`}
            onClick={onClick}
        >
            <div className="bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2">
                {direction === 'left' ? '<' : '>'}
            </div>
        </div>
    );
}
