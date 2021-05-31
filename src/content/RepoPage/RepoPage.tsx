import React from 'react';
import './_repo-page.scss';
import RepoTable from "./RepoTable";
import { gql, OperationVariables } from 'apollo-boost';
import { DataTableRow, Link } from 'carbon-components-react';
import { Query, QueryResult } from 'react-apollo';

const REPO_QUERY = gql`
  query REPO_QUERY {
    # Let's use carbon as our organization
    organization(login: "carbon-design-system") {
      # We'll grab all the repositories in one go. To load more resources
      # continuously, see the advanced topics.
      repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          url
          homepageUrl
          issues(filterBy: { states: OPEN }) {
            totalCount
          }
          stargazers {
            totalCount
          }
          releases(first: 1) {
            totalCount
            nodes {
              name
            }
          }
          name
          updatedAt
          createdAt
          description
          id
        }
      }
    }
  }
`;

const LinkList: React.FC<{ url: string; homepageUrl: string }> = ({url, homepageUrl}) => (
  <ul style={{display: 'flex'}}>
    <li>
      <Link href={url}>GitHub</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

interface GitHubRowDescriptor extends DataTableRow {
  stargazers: Record<string, any>
  createdAt: Date
  updatedAt: Date
  issues: any
  links: any
  url: string
  homepageUrl: string
}

const getRowItems = <R extends GitHubRowDescriptor>(rows: R[]) => rows.map((row) => ({
  ...row,
  key: row.id,
  stars: row.stargazers.totalCount,
  issueCount: row.issues.totalCount,
  createdAt: new Date(row.createdAt).toLocaleDateString(),
  updatedAt: new Date(row.updatedAt).toLocaleDateString(),
  links: <LinkList url={row.url} homepageUrl={row.homepageUrl}/>,
}));

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
  },
  {
    key: 'issueCount',
    header: 'Open Issues',
  },
  {
    key: 'stars',
    header: 'Stars',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

const RepoPage = () => {
  return <Query query={REPO_QUERY}>
    {({ loading, error, data }: QueryResult<any, OperationVariables>) => {
      // Wait for the request to complete
      if (loading) return <>'Loading...'</>;

      // // Something went wrong with the data fetching
      if (error) return <>`Error! ${error.message}`</>;

      // If we're here, we've got our data!
      const { repositories } = data.organization;
      const rows = getRowItems(repositories.nodes);

      return (
        <>
          <RepoTable headers={headers} rows={rows} />
        </>
      );
    }}
  </Query>
};

export default RepoPage;