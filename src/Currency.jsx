import React, { useState } from 'react'
import { currencyCodes } from './Data'
import './Currency.css'
import axios from 'axios';

export default function Currency() {
    const currentCurrency = currencyCodes[0];
    const [baseCurrency, setBaseCurrency] = useState(currentCurrency);
    const [targetCurrency, setTargetCurrency] = useState(currentCurrency);
    const [amount, setAmount] = useState(0);

    const baseUrl = 'https://v6.exchangerate-api.com/v6/';
    const apiKey = 'your-api-key';
    let resultObject = document.getElementById('result');

    const handleBaseCurrencyChange = (event) => {
        setBaseCurrency(event.target.value);
    }
    const handleTargetCurrencyChange = (event) => {
        setTargetCurrency(event.target.value);
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const convert = async () => {
        const url = `${baseUrl}${apiKey}/pair/${baseCurrency}/${targetCurrency}`;
        try {
            const response = await axios.get(url);
            const rate = response.data.conversion_rate;
            const result = amount * rate;
            resultObject.value = result;
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className='currency-main'>
            <div className='currency-base'>
                <label htmlFor="baseCurrency">Base Currency</label>
                <select className='select' name="baseCurrency" onChange={handleBaseCurrencyChange}>
                    {
                        currencyCodes.map((code, index) => {
                            return <option key={index} value={code}>{code}</option>
                        })
                    }
                </select>
                <input type="number" value={amount} placeholder="Amount" min={0} onChange={handleAmountChange} />
            </div>
            <div className='buttons'>
                <button className='convert-button' onClick={() => convert()}>Convert</button>
                <div></div>
                <button className='clear-button' onClick={() => {
                    setAmount(0);
                    resultObject.value = 0;
                }}>Clear</button>
            </div>
            <div className='currency-base'>
                <label htmlFor='targetCurrency'>Target Currency</label>
                <select className='select' name="targetCurrency" onChange={handleTargetCurrencyChange}>
                    {
                        currencyCodes.map((code, index) => {
                            return <option key={index} value={code}>{code}</option>
                        })
                    }
                </select>
                <input type="number" id="result" readOnly disabled />
            </div>
        </div>
    )
}
