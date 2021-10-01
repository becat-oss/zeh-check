/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createResult = /* GraphQL */ `
  mutation CreateResult(
    $input: CreateResultInput!
    $condition: ModelresultConditionInput
  ) {
    createResult(input: $input, condition: $condition) {
      id
      name
      heating
      cooling
      ventilation
      hotwater
      lighting
      others
      generation
      energyReduction
      uValue
      generationPercentage
      createdAt
      updatedAt
    }
  }
`;
export const updateResult = /* GraphQL */ `
  mutation UpdateResult(
    $input: UpdateResultInput!
    $condition: ModelresultConditionInput
  ) {
    updateResult(input: $input, condition: $condition) {
      id
      name
      heating
      cooling
      ventilation
      hotwater
      lighting
      others
      generation
      energyReduction
      uValue
      generationPercentage
      createdAt
      updatedAt
    }
  }
`;
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult(
    $input: DeleteResultInput!
    $condition: ModelresultConditionInput
  ) {
    deleteResult(input: $input, condition: $condition) {
      id
      name
      heating
      cooling
      ventilation
      hotwater
      lighting
      others
      generation
      energyReduction
      uValue
      generationPercentage
      createdAt
      updatedAt
    }
  }
`;
