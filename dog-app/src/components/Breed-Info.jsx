export function BreedInfo({src, onMouseEnter, onMouseLeave, hoveredPet, petName ,onClick,clickedUrl}){
	return(
	<>
		<li className='grid w-full h-full border-2 rounded-xl bg-blue-950'>
			<img className='text-black w-full h-44 cursor-pointer rounded-xl ' src={src} alt='NoBreed Image ' onClick={onClick}  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
			{hoveredPet === petName ? (
			    <h2 className='grid place-items-center w-full text-white font-bold text-3xl opacity-100'>
			      {petName}
			    </h2>
                ) : (
					<h2 className='grid w-full text-blue-950 text-3xl font-bold opacity-0'>
					{petName}	
					</h2>
				)}
		</li>
	
	</>
	)
}