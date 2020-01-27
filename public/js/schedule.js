function resultMatchJSON(data) {
  var dataMatchesHtml = '';
  var match = data.matches;
  var gamePerWeek = match.length;

  if (match.length > 9) {
    gamePerWeek = 9;
  }

  for (let i = 0; i < gamePerWeek; i++) {
    dataMatchesHtml += `
  <div class="col s12 m4 l4">
    <div class="card">
    <div class="card-content">
    <div center-align>
        <h5 class="center-align">Matchday: ${match[i].matchday}</h5>
      <div class="row center-align" style="margin:20px">
        <div class="col s12 truncate">
        <p>  ${match[i].homeTeam.name}</p>
        </div>
        <div class="col s12 ">
          VS
        </div>
        <div class="col s12 truncate">
        <p>  ${match[i].awayTeam.name}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
      `
  }
  document.getElementById("schedule").innerHTML = dataMatchesHtml;
}