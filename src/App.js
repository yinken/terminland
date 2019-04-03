import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  async fetchFromAPI() {
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
    const rsp = await fetch(
      'https://www.terminland.de/pinuts/tlsoap/default.asmx',
      {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'text/xml',
        }),
        body: body,
      }
    ).catch(err => {
      throw err;
    });
    const response = await rsp;

    return response;
  }

  componentDidMount() {
    this.fetchFromAPI();
  }

  render() {
    return null;
  }
}

export default App;
