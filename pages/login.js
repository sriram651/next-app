import { useRouter } from "next/router";
import React from "react";
// import { useAccount } from "wagmi";

const Login = ({ authenticate }) => {
    const router = useRouter();
    // const {address} = useAccount();

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("authenticated") == true) {
                router.push("/dashboard");
            }
            else if(localStorage.getItem("authenticated") == false) {
                router.push("/login");
            }
        }
    })
    // function login() {
    //     authenticate(true);
    //     localStorage.setItem("authenticated", true);
    //     router.push("/dashboard");
    // }
    return (
        <div className="login">
            <div className="content">
                <h1>Connect to Wallet to continue</h1>
                {/* <button className="connect" onClick={login}>Connect</button> */}
            </div>
        </div>
    );
}

export default Login;