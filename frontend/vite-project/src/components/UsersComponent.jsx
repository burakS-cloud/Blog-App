// UsersComponent.js
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../queries/queries";

// Import the delete mutation from your GraphQL server
import { DELETE_POST } from "../mutations/mutations"; // Replace with the actual import path

function UsersComponent() {
  const { loading, error, data } = useQuery(GET_USERS);

  // Use the mutation hook to execute the deletePost mutation
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeletePost = (postId) => {
    // Trigger the deletePost mutation
    deletePost({ variables: { id: postId } });
  };

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
                  {/* Button to trigger deletePost mutation */}
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete Post
                  </button>
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
