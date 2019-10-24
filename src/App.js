import React from "react";
import gql from "graphql-tag";
import { StatusIndicator } from "./StatusIndicator";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  query {
    allLifts {
      id
      name
      status
      capacity
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(QUERY);

  if (loading) return <p>loading lifts</p>;

  return (
    <section>
      <h1>Snowtooth Lift Status</h1>

      {data && !loading && (
        <table className="lifts">
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map(lift => (
              <tr key={lift.id}>
                <td>{lift.name}</td>
                <td>
                  <StatusIndicator status={lift.status} />
                </td>
                <td>{lift.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
