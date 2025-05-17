
export function PetDoc({src,petName,temper}){
	return(
		<>
			<li className='list-none'>
				<img src={src} alt='No Dog Image'width={300} />		
				<b>{`The ${petName} is a ${temper.split(',').slice(0, temper.split(' ').length - 1)} and ${temper.split(' ').slice(temper.split(' ').length - 1)} companion!`}</b>
			
			</li>	
		</>
	)
}