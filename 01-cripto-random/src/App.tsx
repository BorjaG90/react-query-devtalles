import { useEffect, useState } from 'react';
import './App.css';

const getRandomNumberFromAPI = async():Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  return +numberString;
}
export const App = () => {
  const [number, setNumber] = useState<number>();

  useEffect(() => {
    getRandomNumberFromAPI().then(num => setNumber(num))
  }, []);

  return (
    <div className="App App-header">
      <h2>Número aleatorio: { number }</h2>
    </div>
  )
}
