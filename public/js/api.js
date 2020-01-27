const base_url = 'https://api.football-data.org/v2';
const token_api = 'b2057d818d464f23abd7070a8316ba2f';
const bundesliga = 2002;

const endpoint_standing = `${base_url}/competitions/${bundesliga}/standings?standingType=TOTAL`;
const endpoint_schedule = `${base_url}/competitions/${bundesliga}/matches?status=SCHEDULED`;
const endpoint_match = `${base_url}/matches/`;
const endpoint_team = `${base_url}/teams/`;
const endpoint_player = `${base_url}/players/`;

var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': token_api
    }
  });
}

function getStanding() {
  if ('caches' in window) {
    caches.match(endpoint_standing).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          resultStanding(data);
          console.dir("getStanding " + data);
        });
      }
    });
  }else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch (event.request);
        })
    )
  }

  fetchApi(endpoint_standing).then(status).then(json).then(function (data) {
      console.log(data)
      console.log(data)
      resultStanding(data)
    })
    .catch(error);
}

function getTeamProfile() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var teamHTML = ''
    var teamTableHTML = ''
    if ("caches" in window) {
      caches.match(endpoint_team + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultProfileTeam(data)
            data.squad.forEach(function (squad, index) {
              dataSquadJSON = squad;
              teamHTML += `
                <tr>
                  <td>${squad.name}</td>
                  <td >${squad.position}</td>
                </tr>
                `
            });
            teamTableHTML += `<table> <tbody> ${teamHTML}  </tbody> </table>`

            document.getElementById("squad").innerHTML = teamTableHTML;
            resolve(data);
          });
        }
      });
    }else {
      event.respondWith(
          caches.match(event.request, { ignoreSearch: true }).then(function(response) {
              return response || fetch (event.request);
          })
      )
    }

    fetchApi(endpoint_team + idParam).then(status).then(json).then(function (data) {
        console.log(data);
        resultProfileTeam(data)
        dataTeam = data;
        data.squad.forEach(function (squad, index) {
          dataSquadJSON = squad;
          teamHTML += `
            <tr>
              <td>${squad.name}</td>
              <td>:</td>
              <td class='center-align'>${squad.position}</td>
            </tr>
           `
          });
        teamTableHTML += `<table class='table striped' style='margin-top:57px;'>
                <thead style ='background-color: orange'> 
                  <th>Player Name</th>
                  <th></th>
                  <th class="center-align">Position</th>
                </thead>
                <tbody> 
                ${teamHTML}  
                </tbody> 
              </table>`

        document.getElementById("squad").innerHTML = teamTableHTML;
        resolve(data);
      }).catch(error);
  });
}

function getScheduleLeague() {
  return new Promise(function (resolve, reject) {

    if ('caches' in window) {
      caches.match(endpoint_schedule).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultMatchJSON(data);
            resolve(data);
          });
        }
      });
    }else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch (event.request);
        })
    )
}

    fetchApi(endpoint_schedule).then(status).then(json).then(function (data) {
        resultMatchJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}