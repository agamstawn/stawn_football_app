
function createDataMl(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "team") {
        storeName = "selected_team"
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            crestUrl: data.crestUrl,
            address: data.address,
            website: data.website,
            founded: data.founded,
            venue: data.venue,
            squad: data.squad
        }
    } 

    console.log("data " + dataToCreate);
    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function () {
        console.log('add sukses.');
        document.getElementById("addIcon").innerHTML = "check";
        M.toast({
            html: 'Team dimasukan ke My League'
        });
    }).catch(function () {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });

}

function setupMyLeagueHtml(dataType) {

    if (dataType == "team") {
        getAllData("selected_team").then(function (data) {
            resultMyLeague(data);
        });
    }
    
}

function isActive(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb).then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            }).then(function (data) {
                if (data != undefined) {
                    resolve("Team sudah tersimpan")
                } else {
                    reject("Team belum tersimpan")
                }
            });
    });
}

function getSavedDataById(dataType) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        var contentDataHTML = ''
        var teamTableHTML = ''
        getDataById("selected_team", idParam).then(function (team) {
            console.dir("getSavedTimById: " + team);
            resultProfileTeam(team)
            dataTeam = team;
            team.squad.forEach(function (squad) {
                dataSquadJSON = squad;
                contentDataHTML += `
                         <tr>
                           <td>
                            ${squad.name}
                           </td>
                           <td>
                           :
                           </td>
                           <td class='center-align'>${squad.position}</td>
                         </tr>
                `
            });
            teamTableHTML += `
              <table class='table striped' style='margin-top:57px;'>
                <thead style ='background-color: orange'> 
                  <th>Player Name</th>
                  <th></th>
                  <th class="center-align">Position</th>
                </thead>
                <tbody> 
                ${contentDataHTML}  
                </tbody> 
              </table>`

            document.getElementById("squad").innerHTML = teamTableHTML;
        })
    } 
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb).then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            }).then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb).then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            }).then(function (data) {
                resolve(data);
            });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("addIcon").innerHTML = "remove";
        M.toast({
            html: 'Team dikeluarkan dari My League'
        });
    }).catch(function () {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });
}