import { Link, Outlet } from "react-router-dom"


import Header from "../../Components/Header"

export default function Layout(props) {

    return <>
        {/* <header>
            <h1>This is header </h1>

           <nav>
            <ul>
                <li> <Link to="dashboard">Dashboard</Link> </li>
                <li> <Link to="signup">Sign Up</Link> </li>
                <li> <Link to="login">Login</Link> </li>
                <li> <Link to="my-profile">My Profile</Link> </li>
                <li> <Link to="create-ad">Create Ad</Link> </li>
            </ul>
           </nav>
        </header> */}

        <Header />

        {/* <div id="hiddenHeader">

        </div> */}
        <div id="body">


            <div id="content">
                <div id="outlet">
                    <Outlet />
                </div>
                {/* <div id="aside">



                    <aside>
                        <p>This is Side bar</p>
                        <nav>
                            <ul>
                                <li> <Link to="dashboard">Dashboard</Link> </li>
                                <li> <Link to="signup">Sign Up</Link> </li>
                                <li> <Link to="login">Login</Link> </li>
                                <li> <Link to="my-profile">My Profile</Link> </li>
                                <li> <Link to="dashboard/create-ad">Create Ad</Link> </li>
                            </ul>
                        </nav>
                    </aside>
                </div> */}
            </div>

            <div className="clearingDiv">

            </div>

            <div id="footer">
                <footer>
                    <h3>This is Footer</h3>
                </footer>
            </div>
        </div>
    </>
}