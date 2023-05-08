import React from "react";
import { useRouter } from 'next/router';

const AddUser = () => {

    const [fullName, setFullName] = React.useState("");
    const [lang, setLang] = React.useState("");
    const [gender, setGender] = React.useState("Male");
    const [company, setCompany] = React.useState("");

    const router = useRouter();

    React.useState(() => {
        if(localStorage.getItem("authenticated") == false) {
            router.push("/login");
        }
    })

    const submit = (e) => {
        e.preventDefault();
        const newUser = {fullName, gender, lang, company};
        fetch("http://localhost:3000/json", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        })
        .then(() => {
            console.log("New User Added!");
            router.push("/dashboard");
        });
    }
    return (
        <div className="add">
            <h2 className="title">Add a new User</h2>
            <form className="user-registration" onSubmit={submit}>
                <label htmlFor="fullName">Full Name</label>
                <input 
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="gender">Gender</label>
                <select 
                    name="gender" 
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                </select>
                <label htmlFor="language">Language</label>
                <input 
                    type="text" 
                    required
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                />
                <label htmlFor="company">Company</label>
                <input 
                    type="text" 
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button className="add-btn">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;