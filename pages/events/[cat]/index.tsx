        import Image from 'next/image';
        import Link from 'next/link';
        import { dataType, dataTypeGlobal } from '@/pages';
        import { dataOfTtype } from '..';

        export type evntsAllTypes = {
            city: string,
            description: string,
            emails_registered : []
            id : string
            image : string
            title : string
        }


        const PageCatIndex = ({namePage,data}: any) => {

            const toUapperCaseWord = (word : string) => {

                return word[0].toUpperCase() + word.slice(1)
            }

        return (

            <div className='main-events-country'>

            <h2>{toUapperCaseWord(namePage)} Events </h2>

            <div className='events-country'>
                {
                    data.map((el: dataType) => {
                        return <div key={el.id}> 
                        <Link className='card-country-event' href={`/events/${namePage}/${el.id}`}>
                            <img className='img-country-event' src={el.image} alt={el.title} width={400} height={400}/>
                            <div className='hover-block'>
                                <h2> {el.title}</h2>
                                <p> {el.description}</p>
                            </div>
                        </Link>
                        </div> 
                    })
                }
            </div>
            </div>
        )
        }

        export default PageCatIndex;

        export async function getStaticPaths () {

            const {events_categories} : dataOfTtype = await import('../../../data/dataFolder.json')
        
            const allDatas = events_categories.map((ev : dataType) => {

                return {
                    params : {
                        cat : ev.id.toString(),
                    },
                }
            
            });

            return {
                paths: allDatas,
                fallback : false
            }
        }

        export async function getStaticProps (context : any) {

            console.log(context)
            const id = context?.params.cat

            const { allEvents } : any = await import('../../../data/dataFolder.json')


            const data = allEvents.filter((ev : evntsAllTypes) => ev.city === id )

            return {
                props : {allEvents, data, namePage : id},
            }
        
        }