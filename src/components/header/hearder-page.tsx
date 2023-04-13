import Link from "next/link";
import { useRouter } from "next/router";
import {TbLetterV} from "react-icons/tb"; 
import {TbLetterE} from "react-icons/tb";

const HearderPage = () => {

    const router = useRouter()

    return (
            <header>
        <nav>
            <h1><TbLetterE className="icon"/><TbLetterV className="icon"/></h1>
            <div>
            <Link style={router.pathname === "/" ? {color :'#3355ff'} : {}} href={"/"}> Home </Link>
            <Link style={router.pathname === "/events" ? {color :'#3355ff'} : {}} href={"/events"}>Events</Link>
            <Link style={router.pathname === "/aboutUs" ? {color :'#3355ff'} : {}} href={"/aboutUs"}>About</Link>
            </div>
        </nav>
    </header>
    )
    }

export default HearderPage;


