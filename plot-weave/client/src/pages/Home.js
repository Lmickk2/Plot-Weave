import weave from "../images/weave.png"
import book from "../images/book.png"

function Home() {
    return (
        <>
        <div className="hero">
            <div className="intro">
            <h1>Create The Ending You Hoped For.</h1>
            <p>Branch off of any story, at any line. Create the storyline that you want. Within someone else's universe.</p>
            <button className="start">Start Weaving</button>
            </div>
            <div className="demo">
                <img src={weave} className="weave"/>
            </div>
        </div>
        {/* <div className="divider"></div> */}
        <div className="section-2">
            <h1>What's Trending</h1>
            <div className="featured-posts">
                
            </div>
            
        </div>
        </>
    )
}

export default Home;