let timer = null;
let audio = new Audio("alert.mp3");
audio.loop = true;

document.getElementById("startBtn").addEventListener("click", () => {
    Notification.requestPermission();

    let min = parseInt(document.getElementById("min").value) || 0;
    let sec = parseInt(document.getElementById("sec").value) || 0;

    let total = min * 60 + sec;
    if (total <= 0) return;

    timer = setInterval(() => {
        let m = Math.floor(total / 60);
        let s = total % 60;

        document.getElementById("display").textContent =
            `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

        if (total === 0) {
            clearInterval(timer);

            new Notification("Timer Finished!");
            audio.play();
        }

        total--;
    }, 1000);
});

document.getElementById("stopBtn").addEventListener("click", () => {
    clearInterval(timer);
    audio.pause();
    audio.currentTime = 0;

    document.getElementById("display").textContent = "00:00";
});
