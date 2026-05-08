function sendWhatsApp(itemName, price) {
    let myNumber = "91XXXXXXXXXX"; // Apna 10 digit number yahan likhein
    let msg = "Namaste Anjani Mart, mujhe ye chahiye: " + itemName + " (Rs." + price + ")";
    let url = "https://wa.me/" + myNumber + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
}
