import moment from "moment";

export const FormatDate = (timestamp) => new Date(timestamp);

export const formatDateForText = (date) => moment(date).format('ll');

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getDatesRange = (startDate, endDate) => {
    if (!startDate || !endDate) throw new Error("Start and end dates are required.");
    const start = moment(startDate, 'MM/DD/YYYY');
    const end = moment(endDate, 'MM/DD/YYYY');

    if (!start.isValid() || !end.isValid()) return "Invalid date range";

    const dates = [];
    while (start.isSameOrBefore(end)) {
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1, 'days');
    }
    return dates;
};

export const GetDateRangeToDisplay=()=>{
    const dateList=[];
    for(let i=0;i<7;i++){
        dateList.push({
            date:moment().add(i,'days').format('DD'),
            day:moment().add(i,'days').format('dd'),
            formattedDate:moment().add(i,'days').format('L'),
        })
    }
    return dateList;
}

export const GetPreviousDateRangeToDisplay = () => {
    const dateList = [];
    for (let i = 0; i < 7; i++) {
        dateList.push({
            date: moment().subtract(i, 'days').format('DD'),
            day: moment().subtract(i, 'days').format('dd'),
            formattedDate: moment().subtract(i, 'days').format('L'),
        });
    }
    return dateList;
};