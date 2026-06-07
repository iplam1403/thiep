const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/events', { hostName: "Test" });
    console.log("Event created:", res.data);
    const eventId = res.data._id;
    const resGuest = await axios.post('http://localhost:5000/api/guests', { eventId, name: "Test Guest" });
    console.log("Guest created:", resGuest.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}
test();
