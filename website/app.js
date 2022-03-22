/* Global Variables */
const apiKey = "ad8feee50a2fafefa4218c59f97b96a0&units=metric";
const generateButton = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

generateButton.addEventListener("click", generateHandling);

function generateHandling() {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  getData(zipCode).then((data) =>
    postData("/", {
      temp: data.main.temp,
      feelings: feelings,
      date: newDate,
    }).then(retrieveData())
  );
}

const getData = async (zipCode) => {
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
  );
  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credential: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " " + "degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
