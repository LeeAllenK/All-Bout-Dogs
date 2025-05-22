export function PetDoc({src,petName,temper,clickedTemper,clickedUrl,clickedPetName}){
	return(
		<>
			{clickedUrl?.length > 0  && 
				<li className='grid w-full h-full place-items-start border-2 rounded-xl bg-blue-950'>
					<img className='grid w-full h-150 rounded-xl ' src={clickedUrl} alt='No Dog Image' />
					<b className='grid text-3xl text-white w-[98%] h-full'>{`The ${clickedPetName} is a ${clickedTemper?.length > 0 ? clickedTemper?.split(',').slice(0, clickedTemper?.split(' ').length - 1) : 'fun'} and ${clickedTemper?.length > 0 ? clickedTemper?.split(' ').slice(clickedTemper?.split(' ').length - 1) : 'loyal'} companion!`}</b>
				</li>	
			}	
			{temper?.length >= 0 && 
				<li className='grid w-full h-full place-items-start border-2 rounded-xl bg-blue-950'>
					<img className=' w-full h-100 rounded-xl ' src={src} alt='No Dog Image' />
					<b className='text-3xl text-white w-[98%] h-full '>{`The ${petName} is a ${temper?.length > 0 ? temper?.split(',').slice(0, temper?.split(' ').length - 1) : 'fun'} and ${temper?.length > 0 ? temper?.split(' ').slice(temper?.split(' ').length - 1) : 'loyal' } companion!`}</b>
				</li>	
			}
		</>
	)
}
