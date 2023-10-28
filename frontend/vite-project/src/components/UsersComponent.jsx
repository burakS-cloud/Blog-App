// UsersComponent.js
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../queries/queries";

function UsersComponent() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Posts:</p>
            <ul>
              {user.posts.map((post) => (
                <li key={post.id}>
                  <p>Title: {post.title}</p>
                  <p>Body: {post.body}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersComponent;
