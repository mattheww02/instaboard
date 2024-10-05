

const Footer = () => {
    return (
        <footer className="bg-white py-4 mt-auto">
            <div className="container px-5">
                <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-auto"><div className="small m-0">Created by Matthew Wight</div></div>
                    <div className="col-auto">
                        <a className="small" href="#!">link1</a>
                        <span className="mx-1">&middot;</span>
                        <a className="small" href="#!">link2</a>
                        <span className="mx-1">&middot;</span>
                        <a className="small" href="#!">link3</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;