// Form submit hone par yeh code chalta hai.
// Yeh form ki values leke FastAPI ke /predict ko bhejta hai aur price dikhata hai.

const form = document.getElementById("house-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Checked amenities ki ginti
  const amenitiesCount = document.querySelectorAll(".amenity:checked").length;

  const house = {
    City: document.getElementById("City").value,
    Property_Type: document.getElementById("Property_Type").value,
    BHK: Number(document.getElementById("BHK").value),
    Size_in_SqFt: Number(document.getElementById("Size_in_SqFt").value),
    Furnished_Status: document.getElementById("Furnished_Status").value,
    Floor_No: Number(document.getElementById("Floor_No").value),
    Total_Floors: Number(document.getElementById("Total_Floors").value),
    Age_of_Property: Number(document.getElementById("Age_of_Property").value),
    Nearby_Schools: Number(document.getElementById("Nearby_Schools").value),
    Nearby_Hospitals: Number(document.getElementById("Nearby_Hospitals").value),
    Public_Transport_Accessibility: document.getElementById("Public_Transport_Accessibility").value,
    Parking_Space: document.getElementById("Parking_Space").value,
    Security: document.getElementById("Security").value,
    Amenities_Count: amenitiesCount,
    Facing: document.getElementById("Facing").value,
    Owner_Type: document.getElementById("Owner_Type").value,
    Availability_Status: document.getElementById("Availability_Status").value
  };

  const resultBox = document.getElementById("result");
  const errorBox = document.getElementById("error");
  resultBox.hidden = true;
  errorBox.hidden = true;

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(house)
    });
    if (!response.ok) {
      throw new Error("Server error " + response.status);
    }
    const data = await response.json();

    document.getElementById("price-lakhs").textContent = "₹ " + data.price_in_lakhs.toFixed(2) + " Lakh";
    document.getElementById("price-crore").textContent = "≈ ₹ " + (data.price_in_lakhs / 100).toFixed(2) + " Crore";
    resultBox.hidden = false;
  } catch (error) {
    errorBox.textContent = "Prediction nahi ho paayi. Details check karo aur dobara try karo. (" + error.message + ")";
    errorBox.hidden = false;
  }
});
