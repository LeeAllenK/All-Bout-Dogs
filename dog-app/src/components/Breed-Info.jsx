
export function BreedInfo({ src, onMouseEnter, onMouseLeave, hoveredPet,petName }){
	
	return(
		<li className='w-fit h-fit'>
			<img src={src} alt='NoBreed Image' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} width={200}/>
			{ hoveredPet === petName ? (
			    <h2 className='text-white font-bold text-3xl opacity-100'>
			      {petName}
			    </h2>
                ) : (
					<h2 className=' text-3xl font-bold opacity-0'>
					{petName}	
					</h2>
				)}
		</li>
	)
}