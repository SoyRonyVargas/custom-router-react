
type PropsRouterQuery = {
    routeParams: {
        [key: string]: string;
    }
}

const Search = ( props: PropsRouterQuery ) => {

    const { routeParams } = props

    return (
        <div>
            <h1>Pagina con querys { routeParams.query } </h1>
        </div>
    )
    
}

export default Search