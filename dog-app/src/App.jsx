import {useState,useEffect,useReducer} from 'react';

import './index.css'
function App() {
    const [info, setInfo] = useState('')

    useEffect(() => {
      const getDogs = async ()=>{
        const apiKey = import.meta.env.VITE_API_KEY
        const url = `https://api.api-ninjas.com/v1/dogs?name=doberman`
        const res = await fetch(url, {
          headers: { "X-Api-Key": apiKey },
        });
        const data = await res.json();
        setInfo(data[0].name)
        console.log(data)
      }
      // return ()=> getDogs();
    },[info])
  return (
    <>
      <h1 className='text-center'>{info}</h1>
    </>
  )
}

export default App
