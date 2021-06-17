import React from "react";

const CurrencyFlag = ({code, className}) => <div className={`currency-flag currency-flag-${code.toLowerCase()} ${className}`}/>

export default CurrencyFlag