const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final

const teams2014 = fifaData.filter((year) => {
    return year.Year === 2014 && year.Stage === "Final";
});

const homeTeamFinal = teams2014.map((homeTeam) => {
    return homeTeam['Home Team Name'];
});

console.log(homeTeamFinal);

//(b) Away Team name for 2014 world cup final

const awayTeamFinal = teams2014.map((awayTeam) => {
    return awayTeam['Away Team Name'];
});

console.log(awayTeamFinal);

//(c) Home Team goals for 2014 world cup final

const homeTeamGoal = teams2014.map((homeTeam) => {
    return homeTeam['Home Team Goals'];
});

console.log(homeTeamGoal);

//(d) Away Team goals for 2014 world cup final

const awayTeamGoal = teams2014.map((awayTeam) => {
    return awayTeam['Away Team Goals'];
});

console.log(awayTeamGoal);

//(e) Winner of 2014 world cup final */

const winner2014 = teams2014.map((team) => {
    if (team['Home Team Goals'] > team['Away Team Goals']) {
        return team['Home Team Name'];
    } else {
        return team['Away Team Name'];
    }
});

console.log(winner2014);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(arr) {
    const newArr = arr.filter((team) => {
        return team.Stage === "Final";
    });
    return newArr;
 }

 console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, cb) {
    const newArr = cb(arr);
    const yearsArr = newArr.map((years) => {
        return years.Year;
    });
    return yearsArr;
}

console.log(getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, cb) {
    const finalsArr = cb(arr);
    const winnerArr = finalsArr.map((team) => {
        if (team['Home Team Goals'] > team['Away Team Goals']) {
            return team['Home Team Name'];
        } else {
            return team['Away Team Name'];
        }
    });
    return winnerArr;
}

console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, cbFinals, cbYears, cbWinners) {
    const finalsArr = cbFinals(arr);
    const yearsArr = cbYears(finalsArr, cbFinals);
    const winnersArr = cbWinners(finalsArr, cbFinals);
    const winnerByYear = [];
    for (let i = 0; i < yearsArr.length; i ++) {
        winnerByYear.push("In " + yearsArr[i] + ", " + winnersArr[i] + " won the world cup!");    
    };
    return winnerByYear;
}

console.log(getWinnersByYear(fifaData,getFinals,getYears,getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(cbFinals) {
    const newArr = cbFinals;
    const sumGoals = newArr.reduce((total, goals) => {
        let awaySum = total + goals['Away Team Goals'] + goals['Home Team Goals'];
        return awaySum;
    }, 0);
    const avgGoals = sumGoals / newArr.length;
    return avgGoals.toFixed(2);
 }

console.log(getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
