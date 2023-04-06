export const generateDateStrings = (date, days) => {
    if(days < 0){
        throw new Error("number of days cannot be negative")
    }
    // Initialize an array to store the date strings
    const dateStrings = [];
  
    // Loop through the previous three dates and add their strings to the array
    for (let i = days; i >= 1; i--) {
      const prevDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
      const year = prevDate.getFullYear();
      const month = String(prevDate.getMonth() + 1).padStart(2, '0');
      const day = String(prevDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      dateStrings.push(formattedDate);
    }
  
    // Add the current date string to the array
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    dateStrings.push(formattedDate);
  
    // Loop through the next three dates and add their strings to the array
    for (let i = 1; i <= days; i++) {
      const nextDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
      const year = nextDate.getFullYear();
      const month = String(nextDate.getMonth() + 1).padStart(2, '0');
      const day = String(nextDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      dateStrings.push(formattedDate);
    }
  
    // Return the array of date strings
    return dateStrings;
};

export const getDayString = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeekIndex = date.getDay();
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const dayOfWeekAbbreviation = daysOfWeek[dayOfWeekIndex];
    return {dayOfWeekAbbreviation, dayOfMonth};
};
