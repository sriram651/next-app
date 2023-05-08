import { useRouter } from "next/router";
import React from "react";

export default function Home() {
    const router =useRouter();
    React.useEffect(() => {
        // router.push("/login");
    })
    return (<></>);
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/json");
//   const data = await res.json();

//   return {
//     props: {
//       users: data
//     }
//   }
// }