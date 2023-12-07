export interface IParam {
  id: number;
  minValue: number;
  maxValue: number;
  range: number;
  weight: string;
}

export const ADD_PARAM = 'ADD_PARAM';
export const REMOVE_PARAM = 'REMOVE_PARAM';
export const UPDATE_PARAM = 'UPDATE_PARAM';

interface AddParamAction {
  type: typeof ADD_PARAM;
}

interface RemoveParamAction {
  type: typeof REMOVE_PARAM;
  payload: {
    index: number;
  }
}

interface UpdateParamAction {
  type: typeof UPDATE_PARAM;
  payload: {
    index: number;
    param: IParam;
  }
}

export type ParamActionTypes = AddParamAction | RemoveParamAction | UpdateParamAction;
