    import { useRouter } from 'next/router';
    import { useState, useRef} from 'react';
    import { evntsAllTypes } from '.';

    const PageSingalEvents = ({data} : any) => {

        const [message, setMessage] = useState('')

        const [name, setName]  = useState<string>();

        const [time, setTemOut] = useState<boolean>(false)

        const router = useRouter()

        const ref : any = useRef(null);

        const rgx =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


        const handelSubmit = async (e : any) => {

            e.preventDefault();

            let emailValue = ref.current.value

            const eventId = router?.query.id

            if(name) {

                try {
                    const respense = await fetch("/api/handel-email", {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
    
                        body: JSON.stringify({ email: emailValue, eventId }),
                        
                    })

                    setMessage('congratulations you have successfully registered for this event')
    
                    if(!respense.ok) throw new Error((`Error ${respense.status}`))


                        const respensejson = await respense.json();

                        console.log("POST", respensejson);
                    
                } catch (e) {
        
                    console.log("ERROR", e)
                    setMessage('please enter correct email')
                }
            }

            name && emailValue.match(rgx) && setName("");
        }
    return (
        
        <div className='main-dtails-event'> 

            <img className='event-details-img' src={data.image} alt={data.title}/>

            <div className='sin-up'>

            <h2> {data.title} </h2>
            <p> {data.description}</p>

            <form onSubmit={handelSubmit} className='register'>
                <p className='labal'>Get Register for this event in email :</p>
                <input ref={ref} value={name} autoFocus id="email" placeholder='Register' onChange={(e:any) => {
                    setName(e.target.value)
                }}/>
                <button onClick={() => {
                    if(name) {
                        setTimeout(() => {
                            setTemOut(true)
                        }, 1000);
    
                        setTemOut(false)
                    }
                }} type='submit'> submit </button>
                <div style={time ? {display:'none'} : {display:'block'}}>
                    <p style={message !== 'please enter correct email' ? {color:'green'} : {color:'red'}}> {message} </p>
                </div>
            </form>
            </div>
        </div>
    )
    }

    export default PageSingalEvents

    export async function getStaticPaths() {
        const data = await import('../../../data/dataFolder.json');
        const allEvents = data.allEvents;
            const allPaths = allEvents.map((path : any) => {
            return {
                params: {
                cat: path.city,
                id: path.id,
                },
            };
            });
        
            return {
            paths: allPaths,
            fallback: false,
            };
        }
        
        export async function getStaticProps(context :any) {
            console.log(context);
            const id = context.params.id;
            const { allEvents } = await import('../../../data/dataFolder.json');
            const eventData = allEvents.find((ev) => id === ev.id);
        
            return {
            props: { data: eventData },
            };
        }