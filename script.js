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
