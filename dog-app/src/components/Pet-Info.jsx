import {BackBtn} from './Back-Btn'
export function PetDoc({src,petName,temper,clickedTemper,clickedUrl}){

	return(
		<>
			{clickedUrl?.length > 0  ? (
				<li className='grid place-items-center'>
					<img className='w-[50%] rounded-xl' src={clickedUrl} alt='No Dog Image' />
					<b className='text-3xl text-white w-[50%]'>{`The ${petName} is a ${clickedTemper?.split(',').slice(0, clickedTemper?.split(' ').length - 1)} and ${clickedTemper?.split(' ').slice(clickedTemper?.split(' ').length - 1)} companion!`}</b>
				</li>	
			): (
				<li className='grid w-full h-full place-items-center border-2 rounded-xl bg-blue-950'>
					<img className='grid w-full h-100 rounded-xl ' src={src} alt='No Dog Image' />
						<b className='grid text-3xl text-white w-full '>{`The ${petName} is a ${temper?.split(',').slice(0, temper?.split(' ').length - 1)} and ${temper?.split(' ').slice(temper?.split(' ').length - 1) } companion!`}</b>
				</li>	
			)}	
		</>
	)
}
