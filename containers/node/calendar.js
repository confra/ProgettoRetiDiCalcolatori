const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

// GOOGLE CALENDAR
function newEvent(ref_tok){
 const { google } = require('googleapis');
 const { OAuth2 } = google.auth;

 const oAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
 )

 oAuth2Client.setCredentials({
   refresh_token: ref_tok,
 });

 const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

 /*const eventStartTime = new Date();
 eventStartTime.setDate(eventStartTime.getDate());
 const eventEndTime = new Date();
 eventEndTime.setDate(eventEndTime.getDate());
 eventEndTime.setMinutes(eventEndTime.getMinutes()+10);*/
 // Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
  };

let dateTime = dateTimeForCalander();

 const event = {
   summary: `Nuovo accesso a Day News`,
   description: `Aggiornamento giornaliero sulle news in Italia`,
   colorId: 1,
   start: {
     dateTime: dateTime['start'],
     timeZone: 'Europe/Rome',
   },
   end: {
     dateTime: dateTime['end'],
     timeZone: 'Europe/Rome',
   },
 }

 // Check if we a busy and have an event on our calendar for the same time.
 calendar.freebusy.query(
   {
     resource: {
       timeMin: dateTime['start'],
       timeMax: dateTime['end'],
       timeZone: 'Europe/Rome',
       items: [{ id: 'primary' }],
     },
   },
   (err, res) => {
     // Check for errors in our query and log them if they exist.
     if (err) return console.error('Free Busy Query Error: ', err)

     // Create an array of all events on our calendar during that time.
     const eventArr = res.data.calendars.primary.busy;

     // Check if event array is empty which means we are not busy
     //if (eventArr.length === 0)
       // If we are not busy create a new calendar event.
       return calendar.events.insert(
         { calendarId: 'primary', resource: event },
         err => {
           // Check for errors and log them if they exist.
           if (err) return console.error('Error Creating Calender Event:', err)
           // Else log that the event was created.
           return console.log('Calendar event successfully created.')
         }
       )

     // If event array is not empty log that we are busy.
     return console.log(`Sorry I'm busy...`);
   }
 )
}

module.exports = {newEvent}; 