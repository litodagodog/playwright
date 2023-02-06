import { test, Page , expect} from '@playwright/test';
    //Generate Random Date
    function randomDate(date1, date2){
        function randomValueBetween(min, max) {
        return Math.random() * (max - min) + min;
        }
        var date1 = date1 || '01-01-2000'
        var date2 = date2 || new Date().toLocaleDateString()
        date1 = new Date(date1).getTime()
        date2 = new Date(date2).getTime()
        if( date1>date2){
            return new Date(randomValueBetween(date2,date1)).toLocaleDateString()   
        } else{
            return new Date(randomValueBetween(date1, date2)).toLocaleDateString()  

        }
    }
    //Format the date to YYYY-MM-DD
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }