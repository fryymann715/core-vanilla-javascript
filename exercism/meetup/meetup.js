const dayMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}
const weeksMap = {
  1: [1, 7],
  2: [8, 14],
  3: [15, 21],
  4: [22, 28],
  5: [29, 31]
}
const DAYS_IN_WEEK = 7


const meetupDay = ( year, month, dayName, whichDay ) => {
  const MONTHS_END = getDaysInMonth( year, month )
  let dayDate
  switch ( whichDay ) {
    case 'teenth':
      let teenthDays = getTeenthDays( year, month )
      dayDate = Object.keys( teenthDays ).filter( date => teenthDays[date] === dayName )[0]
      return new Date( year, month, dayDate )
      break;

    case 'last':
      let lastDays = getLastDays( year, month )
      dayDate = Object.keys( lastDays ).filter( date => lastDays[date] == dayName )[0]
      return new Date( year, month, dayDate )
      break;

    default:
      let weekNumber = parseInt( whichDay[0] )
      if ( weekNumber ) {
        let daysOfWeek = getDaysOfWeek( year, month, weekNumber )
        dayDate = Object.keys( daysOfWeek ).filter( date => daysOfWeek[date] === dayName )[0]
        if ( dayDate > MONTHS_END ) {
          throw new Error()
        }
        return new Date( year, month, dayDate )
      }
  }
}

const getDaysInMonth = ( year, month ) => {
  return new Date( year, month+1, 0 ).getDate()
}

const getLastDays = ( year, month ) => {
  const MONTHS_END = getDaysInMonth( year, month )
  const lastDays = {}
  for ( let day = MONTHS_END, x = 0; x < DAYS_IN_WEEK; day--, x++ ) {
    let date = new Date( year, month, day )
    lastDays[day] = dayMap[date.getDay()]
  }
  return lastDays
}

const getTeenthDays = ( year, month ) => {
  const BEGINING_OF_TEENTHS = 13
  const END_OF_TEENTHS = BEGINING_OF_TEENTHS + DAYS_IN_WEEK
  const teenthDays = {}
  for ( let x = BEGINING_OF_TEENTHS; x < END_OF_TEENTHS; x++ ) {
    let date = new Date( year, month, x )
    teenthDays[x] = dayMap[date.getDay()]
  }
  return teenthDays
}

const getDaysOfWeek = ( year, month, week ) => {
  const WEEK_START = weeksMap[week][0]
  const WEEK_END = weeksMap[week][1]
  const daysOfWeek = {}
  for ( let day = WEEK_START, x = 0; x < DAYS_IN_WEEK; day++, x++ ) {
    let date = new Date( year, month, day )
    daysOfWeek[day] = dayMap[date.getDay()]
  }
  return daysOfWeek
}

module.exports = meetupDay
