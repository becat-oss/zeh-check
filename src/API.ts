/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateResultInput = {
  id?: string | null,
  name: string,
  heating?: number | null,
  cooling?: number | null,
  ventilation?: number | null,
  hotwater?: number | null,
  lighting?: number | null,
  others?: number | null,
  generation?: number | null,
  energyReduction?: number | null,
  uValue?: number | null,
  generationPercentage?: number | null,
};

export type ModelresultConditionInput = {
  name?: ModelStringInput | null,
  heating?: ModelFloatInput | null,
  cooling?: ModelFloatInput | null,
  ventilation?: ModelFloatInput | null,
  hotwater?: ModelFloatInput | null,
  lighting?: ModelFloatInput | null,
  others?: ModelFloatInput | null,
  generation?: ModelFloatInput | null,
  energyReduction?: ModelFloatInput | null,
  uValue?: ModelFloatInput | null,
  generationPercentage?: ModelFloatInput | null,
  and?: Array< ModelresultConditionInput | null > | null,
  or?: Array< ModelresultConditionInput | null > | null,
  not?: ModelresultConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type result = {
  __typename: "result",
  id: string,
  name: string,
  heating?: number | null,
  cooling?: number | null,
  ventilation?: number | null,
  hotwater?: number | null,
  lighting?: number | null,
  others?: number | null,
  generation?: number | null,
  energyReduction?: number | null,
  uValue?: number | null,
  generationPercentage?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateResultInput = {
  id: string,
  name?: string | null,
  heating?: number | null,
  cooling?: number | null,
  ventilation?: number | null,
  hotwater?: number | null,
  lighting?: number | null,
  others?: number | null,
  generation?: number | null,
  energyReduction?: number | null,
  uValue?: number | null,
  generationPercentage?: number | null,
};

export type DeleteResultInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items?:  Array<Todo | null > | null,
  nextToken?: string | null,
};

export type ModelresultFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  heating?: ModelFloatInput | null,
  cooling?: ModelFloatInput | null,
  ventilation?: ModelFloatInput | null,
  hotwater?: ModelFloatInput | null,
  lighting?: ModelFloatInput | null,
  others?: ModelFloatInput | null,
  generation?: ModelFloatInput | null,
  energyReduction?: ModelFloatInput | null,
  uValue?: ModelFloatInput | null,
  generationPercentage?: ModelFloatInput | null,
  and?: Array< ModelresultFilterInput | null > | null,
  or?: Array< ModelresultFilterInput | null > | null,
  not?: ModelresultFilterInput | null,
};

export type ModelresultConnection = {
  __typename: "ModelresultConnection",
  items?:  Array<result | null > | null,
  nextToken?: string | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateResultMutationVariables = {
  input: CreateResultInput,
  condition?: ModelresultConditionInput | null,
};

export type CreateResultMutation = {
  createResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateResultMutationVariables = {
  input: UpdateResultInput,
  condition?: ModelresultConditionInput | null,
};

export type UpdateResultMutation = {
  updateResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteResultMutationVariables = {
  input: DeleteResultInput,
  condition?: ModelresultConditionInput | null,
};

export type DeleteResultMutation = {
  deleteResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items?:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetResultQueryVariables = {
  id: string,
};

export type GetResultQuery = {
  getResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListResultsQueryVariables = {
  filter?: ModelresultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListResultsQuery = {
  listResults?:  {
    __typename: "ModelresultConnection",
    items?:  Array< {
      __typename: "result",
      id: string,
      name: string,
      heating?: number | null,
      cooling?: number | null,
      ventilation?: number | null,
      hotwater?: number | null,
      lighting?: number | null,
      others?: number | null,
      generation?: number | null,
      energyReduction?: number | null,
      uValue?: number | null,
      generationPercentage?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateResultSubscription = {
  onCreateResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateResultSubscription = {
  onUpdateResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteResultSubscription = {
  onDeleteResult?:  {
    __typename: "result",
    id: string,
    name: string,
    heating?: number | null,
    cooling?: number | null,
    ventilation?: number | null,
    hotwater?: number | null,
    lighting?: number | null,
    others?: number | null,
    generation?: number | null,
    energyReduction?: number | null,
    uValue?: number | null,
    generationPercentage?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
