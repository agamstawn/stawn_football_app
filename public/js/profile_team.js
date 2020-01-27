function resultProfileTeam(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

  document.getElementById("name").innerHTML = data.name;
  document.getElementById("logo").src = data.crestUrl;
  document.getElementById("shortName").innerHTML = data.shortName;
  document.getElementById("address").innerHTML = data.address;
  document.getElementById("website").innerHTML = data.website;
  document.getElementById("founded").innerHTML = data.founded;
  document.getElementById("stadium").innerHTML = data.venue;
  document.getElementById("preloader").innerHTML = '';
}
