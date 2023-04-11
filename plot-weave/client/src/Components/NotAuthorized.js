import { Link } from "react-router-dom"

function NotAuthorized() {
    return (
        <p className="not-logged">
        You need to be logged in to access this page. Please:
        <div className="log-btns">
          <Link to="/login">
            <button className="flashy-btn">Login</button>
          </Link>
          <p className="or">Or</p>
          <Link to="/signup">
            <button className="flashy-btn">Signup</button>
          </Link>
        </div>
      </p>
    )
}

export default NotAuthorized