// =================================
// ADD TASK MODAL
// =================================

const addTaskBtn = document.getElementById("addTaskBtn");

const taskModal = document.getElementById("taskModal");

const closeTaskModal = document.getElementById("closeTaskModal");


// OPEN MODAL

if (addTaskBtn) {

    addTaskBtn.addEventListener("click", function () {

        taskModal.style.display = "flex";

    });

}


// CLOSE MODAL

if (closeTaskModal) {

    closeTaskModal.addEventListener("click", function () {

        taskModal.style.display = "none";

    });

}


// Dark Mode

const darkModeBtn = document.getElementById("darkModeBtn");

if(darkModeBtn){
    darkModeBtn.addEventListener("click", function (){
        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("darkMode","enabled");
            darkModeBtn.textContent="☀️";
        }else{
            localStorage.setItem("darkMode", "disabled");
            darkModeBtn.textContent="🌙";
        }

    });

}


// Keep dark mode changing pages

if(localStorage.getItem("darkMode")==="enabled"){
    document.body.classList.add("dark-mode");

    if(darkModeBtn){
        darkModeBtn.textContent="☀️"
    }
}

