import React from "react";
import Users from "../components/userlist";
import data from "/data/persondata.json";
import { useRouter } from "next/router";
import Table from "@/components/table";

export default function Home({ users }) {
  const router = useRouter();

  const [userCount, setUserCount] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchLang, setSearchLang] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("authenticated") == false) {
      router.push("/login");
    }
    else {
      setUserCount(data.json.length);
    }
  })

  function searchName(e) {
    setSearchValue(e.target.value);
  }

  function searchLanguage(e) {
    setSearchLang(e.target.value);
  }

  return (
    <div id="dashboard">
      <main className="main">
        <div className="user-count">
          <div className="text">
            <span className="title">Subscribed Users</span>
            <span className="count">{userCount}</span>
          </div>
        </div>
        <div className="search-user">
          <div className="input">
            <label htmlFor="name-search-box">Search with Name</label>
            <input onChange={searchName} id="name-search-box" className="search-box" type="text" placeholder="Search User..." value={searchValue} />
          </div>
          <div className="input">
            <label htmlFor="lang-search-box">Search with Language</label>
            <input onChange={searchLanguage} id="lang-search-box" className="search-box" type="text" placeholder="Search Lang..." value={searchLang} />
          </div>
        </div>
        <div className="user-list">
          {/* <Users search={searchValue} lang={searchLang} users={users} /> */}
          <Table search={searchValue} lang={searchLang} users={users}/>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/json", {cache: "no-cache"});
  const data = await res.json();

  return {
    props: {
      users: data
    }
  }
}
