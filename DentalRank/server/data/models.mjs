import fs from 'fs';

function getSchools(stu_fac, percent, dat_overall, gpa_overall){
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        let jsonData = JSON.parse(data);

        // We want the filters to return true in the case the data is undefined or the object has undefined data. In the end every school should have complete data
        jsonData = jsonData.filter((obj) => {
            return (!stu_fac || (obj.stu_fac && stu_fac.min ? obj.stu_fac >= stu_fac.min : true) && (obj.stu_fac && stu_fac.max ? obj.stu_fac <= stu_fac.max : true)) &&
                   (!dat_overall || (obj.dat_overall && dat_overall.min ? obj.dat_overall >= dat_overall.min : true) && (obj.dat_overall && dat_overall.max ? obj.dat_overall <= dat_overall.max : true)) &&
                   (!gpa_overall || (obj.gpa_overall && gpa_overall.min ? obj.gpa_overall >= gpa_overall.min : true) && (obj.gpa_overall && gpa_overall.max ? obj.gpa_overall <= gpa_overall.max : true)) &&
                   (!percent || (obj.percent && percent.min ? obj.percent >= percent.min : true) && (obj.percent && percent.max ? obj.percent <= percent.max : true));
        });
       
        //return list of objects instead
        return jsonData

    } catch (err) {
        return [err.toString()]
    }
}

export { getSchools };