function databasePromise(idb) {
    var dbPromise = idb.open("stawn_footbal_db", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("selected_team")) {
            var indexTimFav = upgradeDb.createObjectStore("selected_team", {
                keyPath: "id"
            });
            indexTimFav.createIndex("team", "name", {
                unique: false
            });
        }
    });

    return dbPromise;
}