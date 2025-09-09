
function doneloading() {
    // Undo the loading animation
    clearInterval(window.loader);
    delete window.loader;
    document.getElementById("loadinfo").remove();
}

function getEnding(num) {
    if (num === 1){
        return "st"
    } else if (num === 2) {
        return "nd"
    } else if (num === 3) {
        return "rd"
    } else {
        return "th";
    }
}


let FTC_TEAM_NUMBER = 19971;
let BASE_API = "https://api.ftcscout.org/rest/v1";
let API = `${BASE_API}/teams/${FTC_TEAM_NUMBER}`

async function fill_data() {
    let team_data = await (await fetch(API)).json();

    let toappend = [];

    let welcome = document.createElement("h1");
    welcome.innerHTML = `Hello! We are FTC Team #${team_data["number"]}, ${team_data["name"]}, from ${team_data["schoolName"]}`;
    toappend.push(welcome);

    let date_data = document.createElement("h3")
    date_data.innerHTML = `We started FTC in ${team_data["rookieYear"]} so we have been doing this for ${new Date().getFullYear() - team_data["rookieYear"] + 1} years! Wow.`;
    toappend.push(date_data);

    let quick_stats = await (await fetch(`${API}/quick-stats`)).json();
    let quick_stats_last = await (await fetch(`${API}/quick-stats?season=${quick_stats["season"]-1}`)).json();
    let latest_season = quick_stats["season"];

    let stat_header = document.createElement("h2");
    stat_header.innerText = `For the ${quick_stats["season"]} season:`;
    toappend.push(stat_header);

    let qstatlist = document.createElement("ul");
    for (const [key, value] of Object.entries({"autonomous":"auto", "teleop":"dc", "endgame":"eg"}))
    {
        let li = document.createElement("li");
        let qstat = document.createElement("h3");
        qstat.innerHTML = `For ${key}, we are the ${quick_stats[value]["rank"]}th best team in the world. `;
        if (quick_stats_last[value]["rank"] < quick_stats[value]["rank"]) {
            qstat.innerHTML += `Which is slightly worse by ${quick_stats[value]["rank"] - quick_stats_last[value]["rank"]} positions from last year :(. (Last year we were ${quick_stats_last[value]["rank"]}th)`;
        } else if (quick_stats_last[value]["rank"] > quick_stats[value]["rank"]) {
            qstat.innerHTML += `Which is an improvement of ${quick_stats_last[value]["rank"] - quick_stats[value]["rank"]} positions from last year!! (Last year we were ${quick_stats_last[value]["rank"]}th)`;
        } else {
            qstat.innerHTML += "Which is exactly the same as last year."
        }
        li.append(qstat);
        qstatlist.append(li);
    }

    {
        let value = "tot";
        let li = document.createElement("li");
        let qstat = document.createElement("h3");
        qstat.innerHTML = `In general, we are the ${quick_stats[value]["rank"]}th best team in the world. `;
        if (quick_stats_last[value]["rank"] < quick_stats[value]["rank"]) {
            qstat.innerHTML += `Which is slightly worse by ${quick_stats[value]["rank"] - quick_stats_last[value]["rank"]} positions from last year :(. (Last year we were ${quick_stats_last[value]["rank"]}th)`;
        } else if (quick_stats_last[value]["rank"] > quick_stats[value]["rank"]) {
            qstat.innerHTML += `Which is an improvement of ${quick_stats_last[value]["rank"] - quick_stats[value]["rank"]} positions from last year!! (Last year we were ${quick_stats_last[value]["rank"]}th)`;
        } else {
            qstat.innerHTML += "Which is exactly the same as last year.";
        }
        li.append(qstat);
        qstatlist.append(li);
    }

    toappend.push(qstatlist)

    let award_header = document.createElement("h2");
    award_header.innerHTML = "In terms of awards:"
    toappend.push(award_header);

    let award_data = await (await fetch(`${API}/awards`)).json();

    let awardlist = document.createElement("ul");

    for (const award of award_data) {
        let li = document.createElement("li");
        let awstat = document.createElement("h3");
        let event_data = await (await fetch(`${BASE_API}/events/${award["season"]}/${award["eventCode"]}`)).json();
        awstat.innerHTML = `In ${award["season"]} at ${event_data["name"]} (${event_data["type"]}), we got the ${award["placement"]}${getEnding(award["placement"])} place ${award["type"]} award!`

        li.append(awstat);
        awardlist.append(li);
    }
    toappend.push(awardlist)

    doneloading();

    document.body.append(...toappend);

}


fill_data().then(()=>{
    console.log("Data loaded!");
})











