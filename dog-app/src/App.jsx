import {useState,useEffect,useReducer} from 'react';
import {PetDoc} from './components/Pet-Info';
import {BreedInfo} from './components/Breed-Info';
import {PetReducer} from './PetReducer';
import {BackBtn} from './components/Back-Btn'
import './index.css';

const initialState={
  info: [],
  dog: '',
  getDog: '',
  clickedTemper: '',
  clickedUrl: '',
  hoveredPet: '',

}
function App() {
    const [info, setInfo] = useState([]);
    const [dog ,setDog] = useState(initialState);
    const [dogs ,setDogs] = useState([]);
    const [getDog ,setGetDog] = useState(initialState);
    const [hoveredPet, setHoveredPet] = useState(initialState);
    const [clickedTemper, setClickedTemper] = useState(initialState);
    const [clickedUrl, setClickedUrl] = useState(initialState);
    const [state , dispatch] = useReducer(PetReducer,initialState);

    useEffect(() => {
      const getDog = async ()=>{
        const apiKey = import.meta.env.VITE_API_KEY
        const url = `https://api.thedogapi.com/v1/breeds/search?q=${state.dog}`
        const res = await fetch(url, {
          headers: { "X-Api-Key": apiKey },
        });
        const data = await res.json();
        console.log(data);
        if(state.dog.length > 0){
          setInfo(data);
        }
      }
      if(state.dog.length > 0) getDog();
    },[state.dog])
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
    // return ()=> getDogs()
  },[])
  const handleDog = ()=>{
    // setDog(getDog);
    dispatch({
      type: 'Search',
      dog: info.length > 0 ? state.getDog : '',
      getDog: state.getDog,
    })
    console.log(state.getDog)
  }
  const handleMouseEnter = (name) => {
      dispatch({type:'HoverPet', hoveredPet: name});
  };

  const handleMouseLeave = () => {  
    dispatch({type: 'LeavePet',hoveredPet: ''});
  };
  const handleClick = (name,url,temper) => {
    dispatch({
      type: 'setClickedInfo',
      clickedUrl: url,
      clickedTemper: temper
    })
  }
  const handleBack = ()=>{
    dispatch({type:'Back', clickedUrl: state.clickedUrl})
    setInfo('');
  }
 
  return (
    <section className='grid w-screen h-screen '>
      <section className='grid place-items-center border-5 h-full w-full gap-4'>
        {info.length === 0 && 
          <>
              <h1 className='text-white text-5xl font-extrabold'>ALL BOUT DOGS</h1>
          </>
        }
        <section className='grid grid-cols-3 place-items-start w-[50%] h-10 gap-1'> 
        {state.clickedUrl.length > 0 || info.length > 0 && 
          <BackBtn 
          className="border-2 text-white text-3xl bg-black w-[50%] h-full rounded-xl cursor-pointer active:translate-y-1" 
          onClick={handleBack}/>
        }
         <input
           className='grid place-items-center text-3xl font-bold bg-white h-full w-full rounded-xl'
           type='text'
           placeholder='Search...'
           value={state.getDog}
           onChange={(e) => dispatch({type: 'getDog', getDog: e.target.value})}  
         />
          <button className='text-xl border-2 w-[75%] h-full bg-white font-bold rounded-xl active:translate-y-1 cursor-pointer ' onClick={handleDog}>Search Companion</button>
        </section>
        {info.length > 0 ? (
      <section className={`grid ${info.length > 1 ? "grid-cols-2 ": "grid-cols-1 "} items-end  w-[50%] h-fit rounded-xl gap-1`}>
         {info.map((pet, i) => (
            <PetDoc
              key={pet.id}
              pet={pet}
              src={pet?.image?.url}
              temper={pet.temperament.toLowerCase()}
              petName={pet.name}

            />
          ))}
      </section>
        ) : state.clickedUrl.length > 0 ? (
          <>
              {dogs.length > 0 &&
                dogs.map((pets, i) => (
                  <PetDoc
                    key={pets.id}
                    pet={pets}
                    clickedUrl={state.clickedUrl}
                    petName={pets.name}
                    clickedTemper={state.clickedTemper}
                  />
                )).slice(0,1)}
          </>
        ) : (
          <>
            <ul className="grid grid-cols-7 items-center place-content-center h-full w-[96%]  rounded-xl">
                {dogs.length > 0 &&
                dogs.map((pets, i) => (
                  <BreedInfo
                    key={pets.id}
                    pet={pets}
                    src={pets.image.url}
                    petName={pets.name}
                    onMouseEnter={() => handleMouseEnter(pets.name)}
                    onMouseLeave={handleMouseLeave}
                    hoveredPet={state.hoveredPet}
                    onClick={() => handleClick(pets.name, pets.image.url,pets.temperament)}
                  />
                ))}
            </ul>
          </>
        )}

      </section>
    </section>
  )
}

export default App
