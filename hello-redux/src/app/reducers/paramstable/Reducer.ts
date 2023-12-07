import { IParam, ParamActionTypes, ADD_PARAM, REMOVE_PARAM, UPDATE_PARAM } from "./Actions";

const initialParams: IParam[] = [];
const initialWeight = "{-3: 5, -2: 5, -1: 6, 0: 7, 1: 6, 2: 5, 3: 5}"

export const paramsReducer = (state = initialParams, action: ParamActionTypes): IParam[] => {
  switch (action.type) {
    case ADD_PARAM: {
      return [...state, {id: state.length, minValue: 0, maxValue: 2000, range: 0, weight: initialWeight }];
    }
    case REMOVE_PARAM: {
      console.log(action.payload.index)
      const newParams = state.filter((param, index) =>
        index !== action.payload.index
      );
      return newParams
    }
    case UPDATE_PARAM: {
      const newParams = state.map((param, index) => 
        index === action.payload.index ? action.payload.param : param
      );
      return newParams
    }
    default:
      return state;
  }
};