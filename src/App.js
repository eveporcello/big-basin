import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  query BigBasinQuery {
    allLifts {
      id
      name
      status
      capacity
      trailAccess {
        name
        status
        accessedByLifts {
          name
          night
        }
      }
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(QUERY);

  if (loading) return <p>loading lifts</p>;

  return (
    <>
      <h1>Big Basin Avalanche Center</h1>
      <h2>
        Avalanche Danger is <b>HIGH</b>
      </h2>
      <p>
        Conditions in the backcountry are dangerous, and we'd advise waiting
        until the snow settles.
      </p>
      <p>
        In the meantime, go ride a chairlift, and always ride with a friend:
      </p>
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
                  <td>{lift.status}</td>
                  <td>{lift.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
