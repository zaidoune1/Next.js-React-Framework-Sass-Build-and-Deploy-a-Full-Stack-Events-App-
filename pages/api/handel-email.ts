import path from 'path';
import fs from 'fs';


export default function handler(req : any, res : any) {

    const {email, eventId} = req.body;


    const buldPath = () => {

        return path.join(process.cwd(), 'data', 'dataFolder.json')
    }

    const dataExtract = (filePath : any) => {

        const dataPth : any = fs.readFileSync(filePath);

        const dataPathJson = JSON.parse(dataPth);

        return dataPathJson;
    }

    const pathBuld = buldPath();

    const {events_categories, allEvents} = dataExtract(pathBuld)

    const {method} = req

    if(method === "POST") {

        if(!email || !email.includes('@')) {
            res.status(422).json({message: "invalid email"})
            return;
        }

        const allEventsData = allEvents.map((ev : any) => {
            if(ev.id === eventId) {

                if(ev.emails_registered.includes(email)) {

                    res.status(409).json({
                        message : 'this email has already ben registerd'
                    })
                }
                return {
                    ...ev, emails_registered: [...ev.emails_registered, email]
                }
            }
            return ev;
        });

        fs.writeFileSync(pathBuld, JSON.stringify({ events_categories, allEvents: allEventsData }));

        if(!allEvents) {
            res.status(404).json({
                status : 404,
                message: "Events data not found"
            })
        }
        res.status(200).json({message : `you has ben register successfully with the email : ${email} ${eventId} `})
    }

}