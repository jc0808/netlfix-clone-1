import "./Banner.css";

const Banner = () => {

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };


    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url('https://res.cloudinary.com/practicaldev/image/fetch/s--THrf5Yjw--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n6brz4p7iq7j1mulo1nv.jpg') `,
            backgroundPosition: "center center"
        }}>

            <div className="banner__contents">
                <h1 className="banner__title">Movie Name</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner_description">{truncate("This is a test description", 150)}</h1>
            </div>

            <div className="banner--fadeBottom" />

        </header>
    )
};

export default Banner;