import weave from "../images/weave.png"
import book from "../images/book.png"
import PostList from "../Components/PostList";
import { Link } from "react-router-dom";
import RandomProfiles from "../Components/TrendingProfiles";

function Home() {
    return (
        <>
        <div className="hero">
            <div className="intro">
            <h1>Create The Ending You Hoped For.</h1>
            <p>Branch off of any story, at any line. Create the storyline that you want. Within someone else's universe.</p>
            <Link to ="/create"><button className="start">Start Weaving</button></Link>
            </div>
            <div className="demo">
                <img src={weave} className="weave"/>
            </div>
        </div>
        {/* <div className="divider"></div> */}
        <div className="section-2">
            <h1>Trending Stories</h1>
            <div className="featured-posts">
                <PostList/>
            </div>
        </div>
        <div className="section-3">
            <h1>Explore Trending Creators</h1>
            <RandomProfiles/>
        </div>
        </>
    )
}

export default Home;