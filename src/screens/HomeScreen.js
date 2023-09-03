
import Banner from "../Banner";
import "./HomeScreen.css";
import Nav from "../Nav";
import Row from "../Row";
import requests from "../request";

const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <Nav />

            <Banner />

            <Row title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />

            <Row title="Trending Now"
                fetchUrl={requests.fetchTrending}
                isLargeRow
            />

            <Row title="Top Rated"
                fetchUrl={requests.fetchTopRated}
                isLargeRow
            />

            <Row title="Action Movies"
                fetchUrl={requests.fetchActionMovies}
                isLargeRow
            />

            <Row title="Comedy Movies"
                fetchUrl={requests.fetchComedyMovies}
                isLargeRow
            />

            <Row title="Horror Movies"
                fetchUrl={requests.fetchHorrorMovies}
                isLargeRow
            />

            <Row title="Romance Movies"
                fetchUrl={requests.fetchRomanceMovies}
                isLargeRow
            />

            <Row title="Documentaries"
                fetchUrl={requests.fetchDocumentaries}
                isLargeRow
            />


            <div className="bottom">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
                    alt="" />
                <p>This App uses the TMDB API but is not endorsed or certified by TMDB.</p>
            </div>


        </div>
    )
};

export default HomeScreen;


// "This product uses the TMDB API but is not endorsed or certified by TMDB."