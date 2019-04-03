import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  fetchFromAPI() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      'POST',
      'https://interface.synxis.com/ChannelConnect.asmx',
      true
    );

    // build SOAP request
    const sr = `<?xml version="1.0" encoding="utf-8"?>
		<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
			<soap:Header><HTNGHeader xmlns="http://htng.org/1.1/Header/"><From><Credential><userName>deshot</userName><password>trui32hn</password></Credential></From></HTNGHeader></soap:Header>
			<soap:Body>
			<OTA_HotelAvailRQ SummaryOnly="true" PrimaryLangID="en" xmlns="http://www.opentravel.org/OTA/2003/05">
				<AvailRequestSegments>
					<AvailRequestSegment>
						<StayDateRange Start="2019-05-04" End="2019-05-05" />
						<RoomStayCandidates>
							<RoomStayCandidate Quantity="1">
								<GuestCounts>
									<GuestCount AgeQualifyingCode="10" Count="1" />';
									</GuestCounts>
							</RoomStayCandidate>
						</RoomStayCandidates>
						<HotelSearchCriteria>
						<Criterion><HotelRef HotelCode="12435" /></Criterion>
						</HotelSearchCriteria>
					</AvailRequestSegment>
				</AvailRequestSegments>
				<HotelReservationIDs>
					<HotelReservationID ResID_Type="14" ResID_Value="" />
				</HotelReservationIDs>
				<POS>
				<Source>
					<BookingChannel Primary="10" />
					<RequestorId ID="10" />
				</Source>
				</POS>
			</OTA_HotelAvailRQ>
			</soap:Body>
		</soap:Envelope>
`;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          console.log(xmlhttp.responseText);
          // alert('done. use firebug/console to see network response');
        }
      }
    };
    // Send the POST request

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
  }

  componentDidMount() {
    this.fetchFromAPI();
  }

  render() {
    return null;
  }
}

export default App;
