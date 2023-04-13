    import Image from "next/image"
    import Link from "next/link"
    import { dataTypeGlobal } from "@/pages"

    const HomePage = ({data} : dataTypeGlobal) => {

    return (
        
    <div className="main-home">
        {

            data.map((ev : any)  => {

                return <Link className="home-link" key={ev.id} href={`/events/${ev.id}`}>
                    <div className="card">
                        <Image className="img" src={ev.image} alt={ev.title} width={400} height={400}/>
                        <div className="text">
                            <h2>{ev.title}</h2>
                            <p>{ev.description}</p>
                        </div>
                    </div>
                </Link>
            })
        
        }
    </div>
    
    )
    }

    export default HomePage