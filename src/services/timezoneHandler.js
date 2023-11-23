const moment = require('moment-timezone');
const TIMEZONE = process.env.TZ;

const timezoneHandler = events => {
  const evs = events.map(event => {
    const convertedDateTime = moment
      .utc(event.dateTime)
      .tz(process.env.TZ)
      .format(TIMEZONE);

    return { ...event, dateTime: convertedDateTime };
  });

  return evs;
};

module.exports = { timezoneHandler };
