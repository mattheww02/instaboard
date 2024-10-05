

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
            <div className="container px-5">
                <a className="navbar-brand" href="/"><span className="fw-bolder text-primary">InstaBoard</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">Profile</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">Boards</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">About</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;