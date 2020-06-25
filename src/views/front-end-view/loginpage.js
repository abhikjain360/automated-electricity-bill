var ctx = document.getElementById("myChart").getContext("2d");
var docs = document.getElementById("id").setAttribute("value", docs[0].id);
var linepoints = {
  label: "usage",
  borderColor: "blue",
  data: [],
};

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function iter1(value, index, array) {
  let date = value.filepath.slice(0, -5);
  let reading = value.reading;
  linepoints.data.push({
    x: date,
    y: reading,
  });
}

docs.forEach(iter1);

var chart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [linepoints],
  },
  options: {
    scales: {
      xAxes: [
        {
          type: "time",
          offset: true,
          display: true,
          round: true,
        },
      ],
    },
  },
});

var label = document.getElementById("amount");

let prevdate = new Date(docs.prevdate);
let year = prevdate.getFullYear();
let month = prevdate.getMonth() + 1;
let dt = prevdate.getDate();

if (dt < 10) {
  dt = "0" + dt;
}
if (month < 10) {
  month = "0" + month;
}

let nextdate = new Date(docs.lastdate);
year = nextdate.getFullYear();
month = nextdate.getMonth() + 1;
dt = nextdate.getDate();

if (dt < 10) {
  dt = "0" + dt;
}
if (month < 10) {
  month = "0" + month;
}

label.innerHTML =
  "Duration of unpayed bill : <b>" +
  prevdate +
  "</b> to <b>" +
  nextdate +
  "</b><br>" +
  "You have consumed total of <b>" +
  docs.diff +
  "</b> Watts <br>" +
  "Amounting to total bill of : Rs. <b>" +
  docs.amount +
  "</b>";
