import {useState,useEffect,useReducer,useRef} from 'react';
import {PetDoc} from './components/Pet-Info';
import {BreedInfo} from './components/Breed-Info';
import {PetReducer} from './PetReducer';
import {BackBtn} from './components/Back-Btn'
import './index.css';

const initialState={
  dog: '',
  getDog: '',
  clickedTemper: '',
  clickedUrl: '',
  clickedPetName: '',

}
function App() {
    const [info, setInfo] = useState([]);
    const [dogs ,setDogs] = useState([]);
    const [state , dispatch] = useReducer(PetReducer,initialState);
    const petId = useRef(0);
  
    useEffect(() => {
      const getDog = async ()=>{
        const apiKey = import.meta.env.VITE_API_KEY
        const url = `https://api.thedogapi.com/v1/breeds/search?q=${state.dog}`
        const res = await fetch(url, {
          headers: { "X-Api-Key": apiKey },
        });
        const data = await res.json();
        console.log(data,'searched dog');
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
    return ()=> getDogs()
  },[])
  const handleDog = ()=>{
    dispatch({ type: 'Search',dog: info.length > 0 || dogs.length > 0 ? state.getDog : '',getDog: state.getDog,})
  }
  const handleClick = (name,url,temper,id) => {
    dispatch({type: 'setClickedInfo', clickedUrl: url, clickedTemper: temper, clickedPetName: name})
    petId.current = id
    console.log('NAME',name)
    console.log('URL',url)
  }
  const handleBack = ()=>{
    dispatch({type:'Back', clickedUrl: ''})
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
        {(dogs?.length > 0 && state.clickedUrl?.length > 0) || (dogs?.length > 0 && info.length > 0) ? (
          <BackBtn 
              className="border-2 text-white text-3xl bg-black w-[50%] h-full rounded-xl cursor-pointer active:translate-y-1 opacity-100 hover:font-extrabold" 
          onClick={handleBack}/>
        ):(
          <BackBtn 
          className="border-2 text-white text-3xl bg-black w-[50%] h-full rounded-xl cursor-pointer active:translate-y-1 opacity-0 " 
          />  
        )}
         <input 
           className='grid border-2 place-items-center text-3xl font-bold bg-white h-full w-full rounded-xl'
           type='text'
           placeholder='Search...'
           value={state.getDog}
           onChange={(e) => dispatch({type: 'getDog', getDog: e.target.value})}  
         />
          <button className="text-xl border-2 w-[75%] h-full bg-white font-bold rounded-xl active:translate-y-1 cursor-pointer hover:font-extrabold" onClick={handleDog}>Search Companion</button>
        </section>
        {info.length > 0 ? (
          <section className={`grid ${info.length > 1 ? "grid-cols-2 " : "grid-cols-1 "} place-items-center  w-[50%] h-fit rounded-xl gap-1`}>
         {info.map((pet) => (
            <PetDoc key={pet.id} pet={pet} src={pet.image?.url} temper={pet.temperament?.length > 0 ? pet.temperament.toLowerCase() : ''} petName={pet.name}
            />))}
         </section>
        ) : state.clickedUrl.length > 0 ? (
            <section className={`grid ${info.length > 1 ? "grid-cols-2 " : "grid-cols-1 "} place-items-center w-[50%] h-fit rounded-xl gap-1`}>
              {dogs.length > 0 &&
                dogs.map((pets) => (
                  <PetDoc key={pets.id} pet={pets} clickedUrl={state.clickedUrl} clickedPetName={state.clickedPetName} clickedTemper={state.clickedTemper?.length > 0 ? state.clickedTemper.toLowerCase() : ''}/> )).slice(petId.current -1, petId.current)}
          </section>
        ) : (
          <>
            <ul className="grid grid-cols-7 items-center place-content-center h-full w-[96%]  rounded-xl">
                {dogs.length > 0 &&
                dogs.map((pets) => (
                  <BreedInfo key={pets.id} pet={pets} src={pets.image.url} petName={pets.name} onClick={() => handleClick(pets.name,pets.image.url,pets.temperament,pets.id)}/> ))}
            </ul>
          </>
        )}
      </section>
    </section>
  )
}

export default App
