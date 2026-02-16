import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

const REFRESH_INTERVAL = 30000; // 30s
const DEBOUNCE_DELAY = 300; // 300ms

export default function CryptoConverter() {

  const [usdInput, setUsdInput] = useState("1000");
  const [debouncedUsd, setDebouncedUsd] = useState(1000);

  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const fetchPrices = useCallback(async () => {
    try {
      if (!hasLoaded) setLoading(true);
      setError(null);

      const response = await fetch(API_URL);
      const data = await response.json();

      setPrices(data);
      setHasLoaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [hasLoaded]);



  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchPrices]);


  useEffect(() => {
    const timer = setTimeout(() => {
      const value = Number(usdInput);
      setDebouncedUsd(isNaN(value) ? 0 : value);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [usdInput]);


  const btcAmount = useMemo(() => {
    if (!prices) return 0;
    return debouncedUsd / prices.bitcoin.usd;
  }, [debouncedUsd, prices]);

  const ethAmount = useMemo(() => {
    if (!prices) return 0;
    return debouncedUsd / prices.ethereum.usd;
  }, [debouncedUsd, prices]);


  return (
    <div className="totalContainer">
    <div className="container">
      {loading && <p>Fetching prices...</p>}
      {!prices && !error && <p>Fetching prices...</p>}
      {error && <p className="error">{error}</p>}
      {prices && (
        <div>
          <p><strong>Bitcoin:</strong> ${prices.bitcoin.usd.toLocaleString()}</p>
          <p><strong>Ethereum:</strong> ${prices.ethereum.usd.toLocaleString()}</p>
        </div>
      )}

      <h2>USD → Crypto Converter</h2>

      <input
        type="number"
        value={usdInput}
        onChange={(e) => setUsdInput(e.target.value)}
        placeholder="Enter USD"
        className="input"
      />

      {loading && <p>Loading prices...</p>}
      {error && <p className="error">{error}</p>}

      {prices && !loading && (
        <div className="result">
          <p>
            <strong>BTC:</strong> {btcAmount.toFixed(6)}
          </p>
          <p>
            <strong>ETH:</strong> {ethAmount.toFixed(6)}
          </p>
        </div>
      )}

      <button onClick={fetchPrices} >
        Refresh Prices
      </button>
    </div>
    </div>
  );
}

//this is the app.js
//this shows main function