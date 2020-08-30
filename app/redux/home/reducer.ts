import HomeActionTypes from './types';

interface IProps {
	userData: Array<any>;
}

export const initialState: IProps = {
	userData: []
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: any): any => {
	const { FETCH_USERS_DATA } = HomeActionTypes;
	switch (action.type) {
		case FETCH_USERS_DATA:
			return {
				...state,
				userData: action.payload
			};
		default:
			return state;
	}
};
