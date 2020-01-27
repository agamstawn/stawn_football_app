function resultStanding(data) {
  var standingHTML = ''
  data.standings.forEach(function (klasemen) {
    var standingTable = ''
    klasemen.table.forEach(function (club) {
      club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
      standingTable += `
      <tr>
        <td class="center-align">${club.position}</td>
          <td>
          <a href="./profile_team.html?id=${club.team.id}">
            <p class="hide-on-small-only">
              <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
              ${club.team.name}
            </p>
            <p class="hide-on-med-and-up">
              <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
            </p>
          </a>
          </td>
        <td class="center-align">${club.playedGames}</td>
        <td class="center-align">${club.won}</td>
        <td class="center-align">${club.draw}</td>
        <td class="center-align">${club.lost}</td>
        <td class="center-align">${club.goalsFor}</td>
        <td class="center-align">${club.goalsAgainst}</td>
        <td class="center-align">${club.goalDifference}</td>
        <td class="center-align">${club.points}</td>
      </tr>`

    })

    standingHTML += `
      <div class="card">
        <div class="card-content">
          <div class="center-align" style="background-color:#ffff8d;">
                <h5>Bundesliga</h5>
          </div>
        <table class="responsive-table bordered " >
        <thead>
          <tr>
            <th class="center-align" >Position</th>
            <th>Team</th>
            <th class="center-align">PG</th>
            <th class="center-align">W</th>
            <th class="center-align">D</th>
            <th class="center-align">L</th>
            <th class="center-align">GF</th>
            <th class="center-align">GA</th>
            <th class="center-align">GD</th>
            <th class="center-align">Points</th>
          </tr>
        </thead>
        <tbody>` + standingTable + `</tbody>
        </table>
      
        </div>
      </div>
    `
  });

  document.getElementById("standingTable").innerHTML = standingHTML;
}