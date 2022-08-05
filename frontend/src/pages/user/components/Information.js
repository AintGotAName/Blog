const Information = ({ username, user, joinedAt }) => {
    const joined = (joinedAt ? new Date(joinedAt) : new Date())
        .toUTCString()
        .split(" ");
    return (
        <>
            <h1>{username}</h1>
            {user.fields.map((field, index) => (
                <h2 key={index}>
                    {index ? `, ` : ``}
                    {field}
                </h2>
            ))}
            <h3>Joined: {`${joined[2]} ${joined[1]}, ${joined[3]}`}</h3>
            <h3>Location: {user.location}</h3>
            <h3>Email: {user.email}</h3>
        </>
    );
};
export default Information;
