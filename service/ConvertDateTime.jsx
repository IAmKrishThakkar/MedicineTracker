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
    const start = moment(startDate, 'MM/DD/YYYY');
    const end = moment(endDate, 'MM/DD/YYYY');
    const dates = [];

    while (start.isSameOrBefore(end)) {
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1, 'days');
    }

    return dates;
};
