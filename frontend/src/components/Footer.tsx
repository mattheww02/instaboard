

const Footer = () => {
    return (
        <footer className="bg-white py-4 mt-auto">
            <div className="container px-5">
                <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-auto"><div className="small m-0">Created by Matthew Wight</div></div>
                    <div className="col-auto fs-2 gap-4">
                        <a className="text-gradient" href="https://www.linkedin.com/in/mattheww02/"><i className="bi bi-linkedin"></i></a>
                        <span className="mx-2"></span>
                        <a className="text-gradient" href="https://github.com/mattheww02"><i className="bi bi-github"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;