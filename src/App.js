import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  soapRequest(url, headers, xml, timeout = 10000) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        headers,
        data: xml,
        timeout,
      })
        .then(response => {
          resolve({
            response: {
              body: response.data,
              statusCode: response.status,
            },
          });
        })
        .catch(error => {
          if (error.response) {
            console.log(`SOAP FAIL: ${error}`);
            reject(error.response.data);
          } else {
            console.log(`SOAP FAIL: ${error}`);
            reject(error);
          }
        });
    });
  }

  async componentDidMount() {    
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Header>
            <tl_Authentifizierung2 xmlns="wsCalendar3">
                <TLNamespace>pinuts</TLNamespace>
                <Login>tlsoap</Login>
                <Password>ql6i2fhf</Password>
            </tl_Authentifizierung2>
        </soap12:Header>
        <soap12:Body>
            <FreieTermine2 xmlns="wsCalendar3">
                <Terminplan>1</Terminplan>
                <DatumVon_UTC>20190401T000000Z</DatumVon_UTC>
                <DatumBis_UTC>20190430T000000Z</DatumBis_UTC>
            </FreieTermine2>
        </soap12:Body>
    </soap12:Envelope>`;

    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
      soapAction: 'wsCalendar3/FreieTermine2',
    };

    const { response } = await this.soapRequest(
      'https://www.terminland.de/pinuts/tlsoap/default.asmx',
      headers,
      body
    );
    console.log(response);
  }

  render() {
    return null;
  }
}

export default App;
