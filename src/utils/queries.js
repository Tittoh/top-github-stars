import gql from 'graphql-tag';

export const FIND_REPOS = gql`
    query {
      search(type: REPOSITORY, query: "stars:>16000", first: 10) {
        edges {
          node {
            ... on Repository {
              name
              description
              url
              stargazers {
                totalCount
              }
              owner {
                login
                avatarUrl
                url
              }
              updatedAt
              forkCount
              homepageUrl
              languages(first: 1) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
`;