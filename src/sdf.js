// import { useEffect, useRef, useState } from 'react';

// function App() {
//   const [view, setView] = useState(null);
//   const started = useRef(false);
// useEffect(() => {
//   let timer;
//   let cancelled = false;

//   const fetchData = async () => {
//     if (cancelled) return;

//     try {
//       const res = await fetch(
//         'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
//       );
//       const data = await res.json();
//       setView(data);
//       console.log("sasss");
//     } catch (e) {
//       console.error(e);
//     }

//     timer = setTimeout(fetchData, 30000);
//   };

//   fetchData();

//   return () => {
//     cancelled = true;
//     clearTimeout(timer);
//   };
// }, []);


//   return (
//     <div>
//       {!view ?
//       <p>Loading...</p>
//             : (
//         <>
//           <p>Bitcoin: ${view.bitcoin.usd}</p>
//           <p>Ethereum: ${view.ethereum.usd}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;