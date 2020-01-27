function resultMyLeague(data) {
    var myLeagueHTML = ''
    data.forEach(function (team) {
        console.dir("createMyLeagueHtml: " + team.name);
        myLeagueHTML += `
        <div class="col s12 m4 l4">
          <ul class="collection">
            <li class="collection-item ">
              <div class="center-align">
               <div>
                  <img src=${team.crestUrl}  alt="logo club" style="float:left;width:36px;height:36px">
               </div>
               <div>
                  <p>
                   <span class="blue-text text-darken-2">  
                    <a href="./profile_team.html?id=${team.id}">${team.name}</a>
                   </span>
                  </p>          
               </div>
              </div>
            </li>
          </ul>
        </div>`
    });
    document.getElementById("myLeague").innerHTML = myLeagueHTML;
}