import { Navbar } from "flowbite-react";

const MyNavbar = () => {
    return (<>
        <div className="cover border relative z-10">
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="/admin">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Flowbite
                    </span>
                </Navbar.Brand>
                
            </Navbar>

        </div>
    </>);
}

export default MyNavbar;