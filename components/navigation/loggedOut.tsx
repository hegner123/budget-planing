import Link from "next/link";

const LoggedOutLinks = () => {
  return (
    <ul className="flex">
      <li>
        <Link className="px-5" href="/auth/login">
          Login
        </Link>
      </li>
      <li>
        <Link className="px-5" href="/auth/register">
          Register
        </Link>
      </li>
    </ul>
  );
};

export default LoggedOutLinks;
