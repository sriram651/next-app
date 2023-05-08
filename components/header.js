import { useRouter } from "next/router";
import React from "react";
import { FaBars } from "react-icons/fa";
import Link from 'next/link';
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Header = ({authenticate}) => {
    const router = useRouter();
    const [pageName, setPageName] = React.useState("");
    const { address, isConnected } = useAccount();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        if(isConnected) {
            localStorage.setItem("authenticated", true);
            setIsAuthenticated(true);
            authenticate(true);
            if (router.pathname == "/dashboard") {
                setPageName("Dashboard");
            }
            else if (router.pathname == "/add") {
                setPageName("Add User");
            }
            else {
                setPageName("");
            }
        }
        else {
            localStorage.setItem("authenticated", false);
            setIsAuthenticated(false);
            setPageName("");
            router.push("/login");
        }
    });

    // function connect() {
    //     if (address) {
    //         localStorage.setItem("authenticated", false);
    //         router.push("/login");
    //     }
    //     else {
    //         authenticate(true);
    //         localStorage.setItem("authenticated", true);
    //         router.push("/dashboard");
    //     }
    // }
    return (
        <div className="header">
            <header>
                <nav className="nav-bar">
                    <div className="nav-title">
                        {/* <FaBars className="menu-icon" /> */}
                        <h1 className="page-name">{pageName}</h1>
                    </div>
                    <div className="links">
                        {isAuthenticated && <Link className={router.pathname == "/dashboard" ? "active" : ""} href="/dashboard">Dashboard</Link>}
                        {isAuthenticated && <Link className={router.pathname == "/add" ? "active" : ""} href="/add">Add User</Link>}
                        <ConnectKitButton />
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;