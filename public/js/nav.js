document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    var dataType = '';

    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);

                        loadPage(setupPage(page));

                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    var page = window.location.hash.substr(1);


    loadPage(setupPage(page));

    function setupPage(page) {
        if (page == "" || page == "#") {
            page = "home";
        } else if (page === "myleague" || page === "team-fav") {
            page = "myleague";
            dataType = "team";
        } else {
            dataType = "";
        }
        return page;
    }

    function loadPage(page) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var content = document.querySelector("#body-content");

            if (this.readyState == 4) {
                if (page === "home") {
                    getStanding();
                } else if (page === "schedule") {
                    getScheduleLeague();
                } else if (page === "myleague") {
                    setupMyLeagueHtml(dataType);
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

});