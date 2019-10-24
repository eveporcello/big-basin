import React from "react";
import gql from "graphql-tag";
import { StatusIndicator } from "./StatusIndicator";
import { useQuery } from "@apollo/react-hooks";
import sunLifts from "./sunLifts";

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
    <>
      <h1>Big Basin Valley Visitor Center</h1>
      <h2>Area Lift Status</h2>
      <section>
        <h2>Snowtooth Lift Status</h2>
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
      <section>
        <h2>Sunridge Lift Status</h2>
        <table className="lifts">
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {sunLifts.map(lift => (
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
      </section>
    </>
  );
}
