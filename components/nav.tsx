export default function Navigation(){
    return(
        <nav className="flex justify-between bg-slate-700 p-5">
            <div>
                <a href="/">Budget Planning</a>
            </div>
            <div>
                <ul className="flex">
                    <li ><a className="px-5" href="/login">Login</a></li>
                    <li ><a className="px-5" href="/register">Register</a></li>
                </ul>
            </div>
        </nav>
    )
}