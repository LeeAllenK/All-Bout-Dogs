export function BreedInfo({src, petName, onClick}){
	return(
	<>
		<li className='grid w-full h-full border-2 rounded-xl bg-blue-950'>
			<img className='text-black w-full h-44 cursor-pointer rounded-xl ' src={src} alt='NoBreed Image ' onClick={onClick} />
			<div className='grid place-items-center'>
			    <h2 className='grid place-items-center place-content-center w-[50%] text-white font-bold text-xl'>
			      {petName}
			    </h2>
			</div>
              
		</li>
	
	</>
	)
}