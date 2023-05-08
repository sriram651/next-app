import { useRouter } from "next/router";
import React from "react";

const User = ({ user }) => {
    const userEndPoint = "http://localhost:3000/json/" + user.id;
    const router = useRouter()
    const [fullName, setFullName] = React.useState(user.fullName);
    const [lang, setLang] = React.useState(user.lang);
    const [gender, setGender] = React.useState(user.gender);
    const [company, setCompany] = React.useState(user.company);

    React.useEffect(() => {
        if(typeof window !== "undefined" && localStorage.getItem("authenticated") == false) {
            router.push("/login");
        }
    })

    function deleteUser() {
        fetch(userEndPoint, {
            method: "DELETE"
        })
        .then(() => {
            router.push("/dashboard");
        });
    }
    function updateUser() {
        const userId = user.id;
        const newUser = { "id": userId, "fullName": fullName, "gender": gender, "lang": lang, "company": company };
        fetch(userEndPoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(() => {
            router.push("/dashboard");
        });
    }

    return (
        <div className="profile">
            <h1 className="title">User Profile</h1>
            <form id="user-update">
                <label htmlFor="user-id">ID Number</label>
                <input disabled type="text" id="user-id" className="inp-box" value={user.id} />
                <label htmlFor="user-name">Name</label>
                <input required type="text" id="user-name" className="inp-box" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <label htmlFor="gender">Gender</label>
                <input required type="text" id="gender" className="inp-box" value={gender} onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="lang">Language</label>
                <input required type="text" id="lang" className="inp-box" value={lang} onChange={(e) => setLang(e.target.value)} />
                <label htmlFor="company">Company</label>
                <input required type="text" id="company" className="inp-box" value={company} onChange={(e) => setCompany(e.target.value)} />
                <button onClick={updateUser} className="btn update-btn">Update</button>
                <button onClick={deleteUser} className="btn delete-btn">Delete</button>
            </form>
        </div>
    );
}

export default User;

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3000/json");
    const data = await res.json();
    const allPaths = data.map((user) => {
        return {
            params: {
                id: user.id.toString()
            }
        }
    });
    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const res = await fetch("http://localhost:3000/json");
    const data = await res.json();
    const currentId = context?.params.id;
    const currentUser = data.filter((user) => user.id == currentId)[0];

    return {
        props: {
            user: currentUser
        }
    }
}