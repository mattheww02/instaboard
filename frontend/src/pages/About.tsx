

const About: React.FC = () => {
    return ( //TODO: make sure to credit artists, package creators etc. on this page
        <div>
            <section className="py-5 bg-gradient-primary-to-secondary text-white">
                <div className="container px-5 my-5">
                    <div className="text-center">
                        <h2 className="display-4 fw-bolder mb-4">About</h2>
                        <p>
                            This app was created to allow users to collaborate in real-time with the help of text chats and drawings.
                        </p>
                        <p>    
                            The site is lightweight and simple—there's no need to create an account or give personal details.
                        </p>
                        <p>
                            To ensure the best performance, InstaBoard uses websockets and a multi-threaded web server to communicate with clients.
                        </p>
                        <a className="btn btn-outline-light btn-lg px-5 py-3 fs-6 fw-bolder" href="/">Go back</a>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div>
                    <p><a href="https://www.flaticon.com/free-icons/pencil" title="pencil icons">Pencil icon created by Yogi Aprelliyanto - Flaticon</a></p>
                    <p><a href="https://github.com/cryptic-wizard/random-word-generator/tree/main">Random word generator created by CrypticWizard</a></p>
                </div>
            </section>
        </div>
    );
};

export default About;