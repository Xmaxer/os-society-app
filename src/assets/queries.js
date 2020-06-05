export const LOGIN_MUTATION = `mutation Login($username: String!, $password: String!) {
    login(input: {authDetails: {username: $username, password: $password}}) {
        token
     }
   }
`;

export const LOGOUT_MUTATION = `mutation {
  logout(input:{}){
    success
  }
}
`;

export const IS_AUTHENTICATED_QUERY = `query {isAuthenticated}`;
