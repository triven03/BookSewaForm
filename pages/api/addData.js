import { google } from 'googleapis';
import credentials from '../key.json';
import moment  from 'moment';

  // const data = [
  //   [localdate,'Cg05krd3',9755676168, "Jaggi Das","Raipur","Dhmatari","Kurud","CG Special Team",50,20,10,20,"हाँ"]
  // ];
  // const newData = [
  //   [localdate,'Cg05krd3',9755676100, "Purnima Das","Raipur","Dhmatari","Kurud","CG Special Team",50,20,10,20,"हाँ"]
  // ];
  
  

  async function appendData(data) {
    return new Promise((resolve, reject) => {
      const spreadsheetId = '1HEx_16vWbFDkDW3IpGEnzAT5vPlZ00l8thlLMXy1Wb4';
      const sheets = google.sheets('v4');
      const auth = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
  
      sheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: spreadsheetId,
        range: 'All', 
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: data,
        },
      }, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        }
  
        var resobj = {
          status: response.status,
          body: JSON.parse(response.config.body).values[0],
          range: response.data.updates.updatedRange
        };
  
        // console.log(response);
        console.log('Data appended successfully!');
  
        resolve(resobj); 
      });
    });
  }
  
  
    function updateData(newData,range) {
      return new Promise((resolve, reject) => {
        const spreadsheetId = '1HEx_16vWbFDkDW3IpGEnzAT5vPlZ00l8thlLMXy1Wb4';
        const sheets = google.sheets('v4');
        const auth = new google.auth.JWT({
          email: credentials.client_email,
          key: credentials.private_key,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
          sheets.spreadsheets.values.update({
              auth: auth,
              spreadsheetId: spreadsheetId,
              range: range, // Update the range as needed
              valueInputOption: 'USER_ENTERED',
              resource: {
                values: newData,
              },
            }, (err, response) => {
              if (err) {
                console.error(err);
                reject(err); 
              }
              var resobj = {
                status: response.status,
                body: JSON.parse(response.config.body).values[0],
                range: response.data.updatedRange
              };
              // console.log(response);
              // console.log(response.statusText);
              // console.log(response.status);
              // console.log(response.config.body);
              // console.log(response.data.updatedRange);
              console.log('Data updated successfully!');
              resolve(resobj);
            });
        });
    }
    
  export default async function handler(req, res) {

    let data = req.body.data
    let update = req.body.update
    let range = req.body.range

    let newData=[];
    newData.push(data)
    if (update) {
      const id = await updateData(newData,range);
      res.status(200).json({ id })
    }
    else{
      const id = await appendData(newData);
      res.status(200).json({ id })
    }
    
  }