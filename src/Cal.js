//https://developers.google.com/calendar/api/guides/create-events#javascript
//https://developers.google.com/calendar/api/quickstart/js
import React, { useState, useEffect } from 'react';

const CLIENT_ID = '165790906618-s87pukgnvvm6r0gomhiqj3livimqecvb.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAp_rr6IfA19Be4DzrENOxub_BnxxpWrT0';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

function Cal() {

	/* global gapi */
	/* global google */

	useEffect(() => {
	    if (window && document) {
	      const scriptA = document.createElement('script');
	      const body = document.getElementsByTagName('body')[0];
	      scriptA.src = 'https://apis.google.com/js/api.js';
	      body.appendChild(scriptA);
	      scriptA.addEventListener('load', () => {
	        gapiLoaded();
	      });

	      const scriptB = document.createElement('script')
	      scriptB.src = 'https://accounts.google.com/gsi/client';
	      body.appendChild(scriptB);
	      scriptB.addEventListener('load', () => {
	        gisLoaded();
	      });
	    }
  	}, []);

	/**
   	  * Callback after api.js is loaded.
  	  */
  	function gapiLoaded() {
    	gapi.load('client', initializeGapiClient);
  	}

  	/**
	  * Callback after Google Identity Services are loaded.
	  */
  	function gisLoaded() {
	    tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: '', // defined later
	    });
	    gisInited = true;
	    maybeEnableButtons();
  	}

  	/**
   	  * Enables user interaction after all libraries are loaded.
      */
    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
          	if (document.getElementById('authorize_button')) {
            	document.getElementById('authorize_button').style.visibility = 'visible';
          	}
        }
    }

    /**
      * Callback after the API client is loaded. Loads the
      * discovery doc to initialize the API.
      */
    async function initializeGapiClient() {
        await gapi.client.init({
         	apiKey: API_KEY,
          	discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    /**
   	  *  Sign in the user upon button click.
   	  */
  	function handleAuthClick() {
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
  	}

  	function createCalEvent() {
        try {
          const event = {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
              'dateTime': '2023-05-28T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2023-05-28T17:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
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
              'RRULE:FREQ=DAILY;COUNT=2'
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
          console.log(err);
          return;
        }
 	}

 	/**
      * Print the summary and start datetime/date of the next ten events in
      * the authorized user's calendar. If no events are found an
      * appropriate message is printed.
      */
	async function listUpcomingEvents() {
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

  	return(<div>
  		<button id="authorize_button" onClick={handleAuthClick}>Authorize</button>
    	<button id="create_event" onClick={createCalEvent}>Creat Event</button>
    	<button id="create_event" onClick={listUpcomingEvents}>List</button>
	</div>);
}

export default Cal;
