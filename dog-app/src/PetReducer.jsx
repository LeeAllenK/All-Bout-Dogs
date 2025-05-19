export function PetReducer(state,action){
	switch(action.type){
		case 'Search':
			console.log('search breed')
			return{
				...state,
				dog: state.getDog,
				getDog: ''
			}
		case 'setClickedInfo': 
			console.log('set')
		return{
			...state,
			clickedUrl: action.clickedUrl,
			clickedTemper: action.clickedTemper
		}
		case 'getDog': 
			console.log(state.getDog)
		return{
			...state,
			getDog: action.getDog
		}
		case 'Back':
			console.log('remove')
		return{
			...state,
			clickedUrl: '',
		}
		case 'HoverPet':
		return{
			...state,
			hoveredPet: action.hoveredPet

		}
		case 'LeavePet':
		return{
			...state,
			hoveredPet: action.hoveredPet
		}
		default: return state
	}
}