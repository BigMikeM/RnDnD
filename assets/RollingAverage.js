export default (data, windowSize) => {
  // windowSize correlates to the number of days used to calculate the average (which, in this case, is 7)
  const newData = []
  for (var i = windowSize - 1; i < data.length; i++) {
    const averages = {}
    for (stat of ['New_cases', 'New_deaths']) {
      // We're just doing averages of confirmed cases and total deaths
      const currWindowData = data.slice(i - windowSize + 1, i + 1)
      // Grab only the range of `data` that we are currently using
      const average =
        currWindowData.reduce((acc, curr) => curr[stat] + acc, 0) / windowSize
      // Find the average
      const keyName = 'avg_' + stat
      averages[keyName] = Math.round(average)
    }
    newData.push({
      ...data[i],
      ...averages
    })
    // And the above spreads our previous data plus the new averages in to our array from the beginning
  }
  return newData
}
