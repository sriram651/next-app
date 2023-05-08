import Link from "next/link";
import React from "react";
const Users = ({ search, lang, users}) => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(false);
    });

    return (
        <div className="user-grid">
            {isLoading && <p>Loading...</p>}
            {!isLoading && users.filter((user) => user.fullName.toLowerCase().startsWith(search.toLowerCase()))
                .filter((user) => user.lang.toLowerCase().startsWith(lang))
                .map((user) => {
                    return (
                        <div className="item">
                            <Link href={`/users/${user.id}`}>
                                <div key={user.id}>
                                    <p>ID: {user.id}</p>
                                    <p>Name: {user.fullName}</p>
                                    {/* <p>Language: {user.lang}</p> */}
                                </div>
                            </Link>
                        </div>
                    )
                })}
        </div>
    );
}

export default Users;