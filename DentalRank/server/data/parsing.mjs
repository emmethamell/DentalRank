/* Script to parse and store from excel file to data.json*/
import XLSX from 'xlsx';
import fs from 'fs';

function parseAndWriteGPADAT() {
    
    const workbook = XLSX.readFile('./SDE2_2022-23-final.xlsx');
    const sheetNameList = workbook.SheetNames;
    let data = XLSX.utils.sheet_to_json(workbook.Sheets['Tab17'], { range: 3 });
    
    data = data.slice(0, 69)
    
    // make data nicer
    data.forEach(obj => {
        obj['school'] = obj['United States, CODA-Accredited Dental Schools']
        delete obj['United States, CODA-Accredited Dental Schools']
    
        obj['dat_overall'] = obj['Academic Average']
        delete obj['Academic Average']
    
        obj['dat_science'] = obj['Total Science']
        delete obj['Total Science']
    
        obj['dat_perceptual'] = obj['Perceptual Ability']
        delete obj['Perceptual Ability']
    
        obj['gpa_science'] = obj['Total Science_1']
        delete obj['Total Science_1']
    
        obj['gpa_overall'] = obj['Overall']
        delete obj['Overall']
    
        obj['location'] = obj['State /\r\nCountry']
        delete obj['State /\r\nCountry']
    
        obj['type'] = obj['Type of Institutional Support']
        delete obj['Type of Institutional Support']
    
    
    })

    data = data.map(item => {
        const { school, ...rest } = item;
        return { name: school, ...rest };
      });

    // get the acceptance data
    let acceptanceData = parseAcceptance();
    data.forEach((obj) => {
        let schoolName = obj['name'];
        let cur = acceptanceData.find((accObj) => {
            return accObj['name'] === schoolName
        })
        console.log(cur)
        obj['percent'] = cur['percent']
    });
    // convert to string and write to file
    data = JSON.stringify(data, null, 2);
    fs.writeFile('./data.json', data, (err) => {
        if (err) {
            console.error('Error writing the file: ', err);
        } else {
            console.log('Succesfully wrote to the file');
        }
    });

}

//return [{ name: 'schoolName', percent: acceptanceRate }, ... ]
function parseAcceptance() {
    const workbook = XLSX.readFile('./SDE2_2022-23-final.xlsx');
    let data = XLSX.utils.sheet_to_json(workbook.Sheets['Tab9'], { range: 3 });
    data = data.slice(0, 69);

    data = data.map((obj) => {
        let newObj = {name: obj['United States, CODA-Accredited Dental Schools'], percent: obj['Percent_2']}
        return newObj
    });

    return data
}

parseAndWriteGPADAT();




