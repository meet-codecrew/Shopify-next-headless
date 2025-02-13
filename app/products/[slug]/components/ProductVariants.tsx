// components/ProductVariantSelector.tsx
"use client";

import { ProductVariant } from "@/types/product";
import { useEffect, useState } from "react";
import { useVariantContext } from "./VariantContext";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  initialPrice: string;
}

export default function ProductVariantSelector({
  variants,
  initialPrice,
}: ProductVariantSelectorProps) {
  const { setSelectedVariant } = useVariantContext();
  const [currentPrice, setCurrentPrice] = useState(initialPrice);

  const options =
    variants[0]?.selectedOptions.map((option) => ({
      name: option.name,
      values: Array.from(
        new Set(
          variants
            .map(
              (v) =>
                v.selectedOptions.find((o) => o.name === option.name)?.value
            )
            .filter(Boolean) as string[]
        )
      ),
    })) || [];

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    options.forEach((option) => {
      initial[option.name] = option.values[0];
    });
    return initial;
  });

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const matchingVariant = variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => newOptions[option.name] === option.value
      )
    );

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setCurrentPrice(
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: matchingVariant.price.currencyCode,
        }).format(parseFloat(matchingVariant.price.amount))
      );
    }
  };

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [variants, setSelectedVariant]);

  return (
    <div>
      <p className="text-2xl font-bold text-gray-200 mb-6">{currentPrice}</p>

      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.name} className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-200">
              {option.name}
            </label>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selectedOptions[option.name] === value;
                const isAvailable = true; // Add availability check here

                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }
                      ${!isAvailable && "opacity-50 cursor-not-allowed"}
                    `}
                    disabled={!isAvailable}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
