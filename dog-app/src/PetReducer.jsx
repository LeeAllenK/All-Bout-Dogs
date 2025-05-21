export function PetReducer(state,action){
	switch(action.type){
		case 'Search':
			return{
				...state,
				dog: state.getDog,
				getDog: ''
			}
		case 'setClickedInfo': 
		return{
			...state,
			clickedUrl: action.clickedUrl,
			clickedTemper: action.clickedTemper,
			clickedPetName: action.clickedPetName
		}
		case 'getDog': 
		return{
			...state,
			getDog: action.getDog
		}
		case 'Back':
		return{
			...state,
			clickedUrl: action.clickedUrl,
		}
		default: return state
	}
}