import { formatCurrency } from "@/lib/formatters";
import React from "react";

interface ProductCardType {
  name: string;
  quantity?: number;
  price: number | string;
}

function ProductCard(props: ProductCardType) {
  return (
    <div className="flex justify-between items-center bg-customColors-blue text-customColors-white rounded-md px-4 py-3 mb-4">
      <p>{props.name}</p>
      <div>
        {props.quantity ? <p>Quantity : {props.quantity}</p> : null}
        price per one: {formatCurrency(props.price)}
      </div>
    </div>
  );
}

export default ProductCard;
