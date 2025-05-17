import {useState,useEffect,useReducer} from 'react';
import {PetDoc} from './components/Pet-Info';
import {BreedInfo} from './components/Breed-Info';
import {PetReducer} from './PetReducer'
import './index.css'

const initialState={
  info: [],
  dog: '',
    
}
function App() {
    const [info, setInfo] = useState([]);
    const [dog ,setDog] = useState('');
    const [dogs ,setDogs] = useState([]);
    const [getDog ,setGetDog] = useState('');
    const [hoveredPet, setHoveredPet] = useState('');
    const [state , dispatch] = useReducer(PetReducer,initialState)

    useEffect(() => {
      const getDog = async ()=>{
        const apiKey = import.meta.env.VITE_API_KEY
        const url = `https://api.thedogapi.com/v1/breeds/search?q=${dog}`
        const res = await fetch(url, {
          headers: { "X-Api-Key": apiKey },
        });
        const data = await res.json();
        console.log(data);
        if(dog.length > 0){
          setInfo(data);
        }
      }
      if(dog.length > 0) getDog();
    },[dog])
  const handleDog = ()=>{
    setDog(getDog);
    dispatch({
      type: 'Search',
      
    })
  }
  useEffect(() => {
    const getDogs = async()=>{
      const apiKey = import.meta.env.VITE_API_KEY
      const url = `https://api.thedogapi.com/v1/breeds`
      const res = await fetch(url,{
        headers: {"x-api-key": apiKey}    
      })
      const data = await res.json();
      setDogs(data)
      console.log(data)
    }
    return ()=> getDogs()
  },[])
  const handleMouseEnter = (name) => {
    setHoveredPet(name);
    console.log('enter')
  };

  const handleMouseLeave = () => {
    setHoveredPet('');
  };
console.log(hoveredPet,'pet')
  return (
    <section className='grid  w-screen h-screen'>
      <section className='grid  place-items-center  border-3 h-full w-full '>
        {info.length === 0 && 
          <>
              <h1 className='text-center'>ALL BOUT DOGS</h1>
          </>
        }
        <section>
         <input
           className='border-2'
           type='text'
           value={getDog}
           onChange={(e) => setGetDog(e.target.value)}  
         />
       <button className='border-2' onClick={handleDog}>click me</button>
        </section>
    
      {info.length > 0 ? (
        info.map((pet,i) => (
          <PetDoc
            key={i}
            pet={pet}
            src={pet.image.url}
            temper={pet.temperament.toLowerCase()}
            petName={pet.name}
          />
        ))
      ):(
          <>
          <ul className='grid grid-cols-9 place-items-center border-7  h-full w-full bg-black '>
          {dogs.length > 0 &&
            dogs.map((pets,i) => (
              <BreedInfo
                key={i}
                pet={pets}
                src={pets.image.url}
                petName={pets.name}
                onMouseEnter={() => handleMouseEnter(pets.name)}
                onMouseLeave={handleMouseLeave}
                hoveredPet={hoveredPet}
              />
          ))  
          }
            </ul>
          </>
        )}  
      </section>
    </section>
  )
}

export default App
