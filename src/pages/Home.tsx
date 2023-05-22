import Link from "../components/Link"

const Home = () => {
  return (
    <div>
        <h1>Home Page</h1>
        <p>
            Esta es la pagina principal
        </p>
        <Link to="/about">Ir a about</Link>
    </div>
  )
}

export default Home