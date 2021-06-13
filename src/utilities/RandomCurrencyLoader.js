import {
  CurrencyDollarIcon,
  CurrencyBangladeshiIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyYenIcon,
  CurrencyRupeeIcon
} from "@heroicons/react/solid";
import React from "react";

const RandomCurrencyLoader = ({className}) => {
  const currencies = [CurrencyDollarIcon, CurrencyBangladeshiIcon, CurrencyEuroIcon, CurrencyPoundIcon, CurrencyYenIcon, CurrencyRupeeIcon]
  return React.createElement(currencies[Math.floor(Math.random() * currencies.length)], {className: `animate-bounce mt-2 ${className}`})
}

export default RandomCurrencyLoader