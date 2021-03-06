import {MUTATION_OPERATION, QUERY_OPERATION} from "./operations";

export const LOGIN_MUTATION = {
    type: MUTATION_OPERATION,
    query: `mutation Login($username: String!, $password: String!) {
    login(input: {attributes: {username: $username, password: $password}}) {
        token
            user {
      username
      id
      resetPassword
    }
     }
   }
`};

export const LOGOUT_MUTATION = {
    type: MUTATION_OPERATION,
    query: `mutation {
  logout(input:{}){
    success
  }
}
`};

export const IS_AUTHENTICATED_QUERY = {
    type: QUERY_OPERATION,
    query: `query {
  isAuthenticated {
    username
    id
    resetPassword
  }
}`
};

export const PLAYERS_QUERY = {
    type: QUERY_OPERATION,
    query: `query Players($order: OrderEnum, $order_by: PlayerOrderEnum, $username_contains: String, $previous_name_contains: String, $username_or_previous_name_contains: String, $first: Int, $skip: Int, $rank_contains: [Int!], $start_join_date: ISO8601DateTime, $end_join_date: ISO8601DateTime)
{
  
  players (order: {order: $order, orderBy: $order_by}, filter: {usernameContains: $username_contains, previousNameContains: $previous_name_contains, usernameOrPreviousNameContains: $username_or_previous_name_contains, rankContains: $rank_contains, startJoinDate: $start_join_date, endJoinDate: $end_join_date}, first: $first, skip: $skip){
            id
    username
    previousNames
    rank
    createdAt
    updatedAt
    comment
    joinDate
  }
  totalPlayers
}`
};

export const CREATE_PLAYER_MUTATION = {
    type: MUTATION_OPERATION,
    query: `mutation Player($username: String!, $join_date: ISO8601DateTime!, $rank: Int!, $comment: String, $previous_names: [String!]){
  createPlayer(input: {attributes: {username: $username, rank: $rank, joinDate: $join_date, previousNames: $previous_names, comment: $comment}}) {
    player {
      username
      id
      joinDate
      rank
      comment
      previousNames
      createdAt
      updatedAt
    }
  }
}`
};

export const DELETE_PLAYER_MUTATION = {
    type: MUTATION_OPERATION,
    query: `mutation DeletePlayer($id: ID!){
  deletePlayer(input: {id: $id}) {
    player {
      username
      id
      comment
      rank
      previousNames
      joinDate
      createdAt
      updatedAt
    }
  }
}`
};

export const UPDATE_PLAYER_MUTATION = {
    type: MUTATION_OPERATION,
    query: `mutation Player($username: String!, $join_date: ISO8601DateTime!, $rank: Int!, $comment: String, $previous_names: [String!], $id: ID!){
  updatePlayer(input: {attributes: {username: $username, rank: $rank, joinDate: $join_date, previousNames: $previous_names, comment: $comment}, id: $id}) {
    player {
      username
      id
      joinDate
      rank
      comment
      previousNames
      createdAt
      updatedAt
    }
  }
}`
};

export const SET_PASSWORD_MUTATION = {
    type: MUTATION_OPERATION,
    query: `mutation User($id: ID!, $password: String!){
  updateUser(input: {attributes: {password: $password}, id: $id}) {
    user {
      id
      username
      resetPassword
    }
  }
}`
};
