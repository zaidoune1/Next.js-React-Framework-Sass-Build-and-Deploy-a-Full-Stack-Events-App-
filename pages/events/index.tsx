import Image from 'next/image';
import { dataTypeGlobal } from '..';

type dataType = {
    description? : string,
    id : string,
    image : string,
    title : string,
}

export type dataOfTtype = {
    events_categories: dataType[]
}
const PageAllEventsTitle = ({data} : dataTypeGlobal) => {

    return (

        <div className='main-event-city' >

            {
                data.map((ev : dataType) => {
                    return <a className='card-event-city' key={ev.id} href={`/events/${ev.id}`}>
                    <Image className='img-event-city' src={ev.image} alt={ev.title} width={400} height={400}/>
                    <h2 className='title-id'> {ev.id} </h2>
                    </a>
                })
            }
        </div>
    )
    }

    export default PageAllEventsTitle;

    export async function getStaticProps() {

        const {events_categories} : dataOfTtype = await import('../../data/dataFolder.json')

        console.log(events_categories)

        return {
            props : {
                data: events_categories,
            }
        }
    }