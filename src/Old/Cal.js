const CLIENT_ID = '165790906618-s87pukgnvvm6r0gomhiqj3livimqecvb.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAp_rr6IfA19Be4DzrENOxub_BnxxpWrT0';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

if (window && document) {
  const scriptA = document.createElement('script');
  const body = document.getElementsByTagName('body')[0];
  scriptA.src = 'https://apis.google.com/js/api.js';
  body.appendChild(scriptA);
  scriptA.addEventListener('load', () => {
    Cal.gapiLoaded();
  });

  const scriptB = document.createElement('script')
  scriptB.src = 'https://accounts.google.com/gsi/client';
  body.appendChild(scriptB);
  scriptB.addEventListener('load', () => {
    Cal.gisLoaded();
  });
}

const Cal = {

	/* global gapi */
	/* global google */

	/**
   	  * Callback after api.js is loaded.
  	  */
  	gapiLoaded : () => {
    	gapi.load('client', Cal.initializeGapiClient);
  	},

  	/**
	  * Callback after Google Identity Services are loaded.
	  */
  	gisLoaded : () => {
	    tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: '', // defined later
	    });
	    gisInited = true;
	    Cal.maybeEnableButtons();
  	},

  	/**
   	  * Enables user interaction after all libraries are loaded.
      */
    maybeEnableButtons : () => {
        if (gapiInited && gisInited) {
          	if (document.getElementById('authorize_button')) {
            	document.getElementById('authorize_button').style.visibility = 'visible';
          	}
        }
    },

    /**
      * Callback after the API client is loaded. Loads the
      * discovery doc to initialize the API.
      */
    initializeGapiClient : async function () {
        await gapi.client.init({
         	apiKey: API_KEY,
          	discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        Cal.maybeEnableButtons();
    },

    /**
   	  *  Sign in the user upon button click.
   	  */
  	handleAuthClick : () => {
        tokenClient.callback = async (resp) => {
          	if (resp.error !== undefined) {
            	throw (resp);
          	}
          	//document.getElementById('authorize_button').innerText = 'Refresh';
          	//await listUpcomingEvents();
        };

        if (gapi.client.getToken() === null) {
			// Prompt the user to select a Google Account and ask for consent to share their data
			// when establishing a new session.
			tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          	// Skip display of account chooser and consent dialog for an existing session.
          	tokenClient.requestAccessToken({prompt: ''});
        }
  	},

  	createCalEvent : (title, location, description, start, end) => {
  		console.log(title, location, description, start, end)
        try {
          const event = {
            'summary': title,
            'location': location,
            'description': description,
            'start': {
              'dateTime': start,
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
              'dateTime': end,
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          };

          /*
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
            ],*/

          const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
          });
          //response = await gapi.client.calendar.events.list(request);
          request.execute(function(event) {
            console.log(event);
          });
        } catch (err) {
          console.log('Error: ' + err);
          return;
        }
 	},

 	/**
      * Print the summary and start datetime/date of the next ten events in
      * the authorized user's calendar. If no events are found an
      * appropriate message is printed.
      */
	listUpcomingEvents : async function() {
        let response;
        try {
          const request = {
            'calendarId': 'primary',
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
          };
          response = await gapi.client.calendar.events.list(request);
        } catch (err) {
          document.getElementById('content').innerText = err.message;
          return;
        }

        const events = response.result.items;
        if (!events || events.length == 0) {
          console.log('No events found.');
          return;
        }
        // Flatten to string to display
        const output = events.reduce(
            (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
            'Events:\n');
        console.log(output);
  	}
}

export default Cal;
