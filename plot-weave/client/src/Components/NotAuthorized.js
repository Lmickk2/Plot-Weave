import { Link } from "react-router-dom"

function NotAuthorized() {
    return (
      <div className="cool-bg">
        <p className="not-logged">
        You need to be logged in to access this page. Please:
        <div className="log-btns">
          <Link to="/login">
            <button className="long-btn">Login</button>
          </Link>
          <p className="or">Or</p>
          <Link to="/signup">
            <button className="long-btn">Signup</button>
          </Link>
        </div>
      </p>
      </div>
    )
}

export default NotAuthorized