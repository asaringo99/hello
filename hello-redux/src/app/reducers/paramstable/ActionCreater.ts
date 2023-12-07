import { IParam, REMOVE_PARAM, ADD_PARAM, UPDATE_PARAM, ParamActionTypes } from "./Actions";

export function addParam(): ParamActionTypes {
    return {
        type: ADD_PARAM
    }
}

export function removeParam(index: number): ParamActionTypes {
    return {
        type: REMOVE_PARAM,
        payload: {
            index: index,
        }
    }
}

export function updateParam(index: number, param: IParam): ParamActionTypes {
    return {
        type: UPDATE_PARAM,
        payload: {
            index: index,
            param: param,
        }
    }
}