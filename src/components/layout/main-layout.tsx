import FooterPage from "../footer/footer-page"
import HearderPage from "../header/hearder-page"

const MainLayout = ({children} : any) => {

    return (

        <div>
        <HearderPage/>
        {children}
        <FooterPage/>
        </div>
    )
    }

export default MainLayout