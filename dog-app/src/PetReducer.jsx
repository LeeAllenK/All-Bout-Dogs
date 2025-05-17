

export function PetReducer(state,action){
	switch(action.type){
		case 'Search':
			console.log('search breed')
			return{
				...state,

			}
		default: return state
	}
}