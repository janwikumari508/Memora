/* =====================================================
   MEMORA
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   RUN AFTER PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       THEME TOGGLE
    ================================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const themeText =
        document.getElementById("themeText");


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.documentElement.classList.add(
            "dark-mode"
        );

        updateThemeUI(true);

    } else {

        document.documentElement.classList.remove(
            "dark-mode"
        );

        updateThemeUI(false);

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const isDark =
                    document.documentElement.classList.toggle(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                updateThemeUI(isDark);

            }
        );

    }


    function updateThemeUI(isDark) {

        if (!themeIcon || !themeText) {
            return;
        }


        if (isDark) {

            themeIcon.textContent = "☀️";

            themeText.textContent = "Light Mode";

            themeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            themeIcon.textContent = "🌙";

            themeText.textContent = "Dark Mode";

            themeToggle.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }



    /* =================================================
       TASK MODAL
    ================================================= */

    const addTaskBtn =
        document.getElementById("addTaskBtn");

    const taskModal =
        document.getElementById("taskModal");

    const closeTaskModal =
        document.getElementById("closeTaskModal");

    const newTaskForm =
        document.getElementById("newTaskForm");


    if (addTaskBtn && taskModal) {

        addTaskBtn.addEventListener(
            "click",
            function () {

                taskModal.classList.add("active");

            }
        );

    }


    if (closeTaskModal && taskModal) {

        closeTaskModal.addEventListener(
            "click",
            function () {

                taskModal.classList.remove("active");

            }
        );

    }


    if (taskModal) {

        taskModal.addEventListener(
            "click",
            function (event) {

                if (event.target === taskModal) {

                    taskModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }



    /* =================================================
       ADD NEW TASK
    ================================================= */

    if (newTaskForm) {

        newTaskForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const taskName =
                    document.getElementById(
                        "taskName"
                    ).value.trim();


                const taskSubject =
                    document.getElementById(
                        "taskSubject"
                    ).value.trim();


                const taskDate =
                    document.getElementById(
                        "taskDate"
                    ).value;


                const taskPriority =
                    document.getElementById(
                        "taskPriority"
                    ).value;


                if (
                    taskName === "" ||
                    taskSubject === "" ||
                    taskDate === ""
                ) {

                    return;

                }


                const task = {

                    id: Date.now(),

                    name: taskName,

                    subject: taskSubject,

                    date: taskDate,

                    priority: taskPriority,

                    completed: false

                };


                saveTask(task);

                addTaskToPage(task);


                newTaskForm.reset();


                if (taskModal) {

                    taskModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }



    /* =================================================
       SAVE TASK
    ================================================= */

    function saveTask(task) {

        const tasks =
            JSON.parse(
                localStorage.getItem("memoraTasks")
            ) || [];


        tasks.push(task);


        localStorage.setItem(
            "memoraTasks",
            JSON.stringify(tasks)
        );

    }



    /* =================================================
       LOAD SAVED TASKS
    ================================================= */

    loadSavedTasks();


    function loadSavedTasks() {

        const tasks =
            JSON.parse(
                localStorage.getItem("memoraTasks")
            ) || [];


        tasks.forEach(function (task) {

            addTaskToPage(task);

        });

    }



    /* =================================================
       ADD TASK TO PAGE
    ================================================= */

    function addTaskToPage(task) {

        const todayTaskList =
            document.getElementById(
                "todayTaskList"
            );


        if (!todayTaskList) {
            return;
        }


        const taskElement =
            document.createElement("div");


        taskElement.className =
            "task";


        taskElement.dataset.status =
            task.completed
                ? "completed"
                : "pending";


        taskElement.dataset.priority =
            task.priority.toLowerCase();


        taskElement.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <div class="task-content">

                <h3>
                    ${escapeHTML(task.name)}
                </h3>

                <p>
                    ${escapeHTML(task.subject)}
                </p>

            </div>

            <span class="task-priority">
                ${escapeHTML(task.priority)}
            </span>

        `;


        if (task.completed) {

            task.classList.add("completed");

        }


        const checkbox =
            taskElement.querySelector(
                "input[type='checkbox']"
            );


        checkbox.addEventListener(
            "change",
            function () {

                task.completed =
                    checkbox.checked;


                taskElement.dataset.status =
                    task.completed
                        ? "completed"
                        : "pending";


                if (task.completed) {

                    taskElement.classList.add(
                        "completed"
                    );

                } else {

                    taskElement.classList.remove(
                        "completed"
                    );

                }


                updateSavedTask(task);

            }
        );


        todayTaskList.appendChild(
            taskElement
        );

    }



    /* =================================================
       UPDATE SAVED TASK
    ================================================= */

    function updateSavedTask(updatedTask) {

        const tasks =
            JSON.parse(
                localStorage.getItem("memoraTasks")
            ) || [];


        const index =
            tasks.findIndex(
                function (task) {

                    return task.id === updatedTask.id;

                }
            );


        if (index !== -1) {

            tasks[index] = updatedTask;

        }


        localStorage.setItem(
            "memoraTasks",
            JSON.stringify(tasks)
        );

    }



    /* =================================================
       TASK FILTERS
    ================================================= */

    const filters =
        document.querySelectorAll(
            ".filter"
        );


    filters.forEach(function (filter) {

        filter.addEventListener(
            "click",
            function () {

                filters.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                filter.classList.add(
                    "active"
                );


                const selectedFilter =
                    filter.dataset.filter;


                const tasks =
                    document.querySelectorAll(
                        "#todayTaskList .task"
                    );


                tasks.forEach(
                    function (task) {

                        const status =
                            task.dataset.status;

                        const priority =
                            task.dataset.priority;


                        let showTask = true;


                        if (
                            selectedFilter ===
                            "completed"
                        ) {

                            showTask =
                                status ===
                                "completed";

                        }


                        if (
                            selectedFilter ===
                            "pending"
                        ) {

                            showTask =
                                status ===
                                "pending";

                        }


                        if (
                            selectedFilter ===
                            "high"
                        ) {

                            showTask =
                                priority ===
                                "high";

                        }


                        task.style.display =
                            showTask
                                ? "flex"
                                : "none";

                    }
                );

            }
        );

    });



    /* =================================================
       EXISTING CHECKBOXES
    ================================================= */

    const existingCheckboxes =
        document.querySelectorAll(
            ".task input[type='checkbox']"
        );


    existingCheckboxes.forEach(
        function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {

                    const task =
                        checkbox.closest(
                            ".task"
                        );


                    if (!task) {
                        return;
                    }


                    if (checkbox.checked) {

                        task.classList.add(
                            "completed"
                        );

                        task.dataset.status =
                            "completed";

                    } else {

                        task.classList.remove(
                            "completed"
                        );

                        task.dataset.status =
                            "pending";

                    }

                }
            );

        }
    );



    /* =================================================
       ESCAPE HTML
    ================================================= */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }


    /* =================================================
       LOADING PAGE — REDIRECT LOGIC
       Runs ONLY when loading.html is open.
       Checks localStorage, then sends user to home.html
       after 1.8 seconds.
    ================================================= */

    // Look for the element with id="loading-page" (only in loading.html)
    var loadingPage = document.getElementById("loading-page");

    if (loadingPage) {

        // Wait 1.8 seconds, then redirect to the Personal Dashboard
        setTimeout(function () {
            window.location.href = "index.html";
        }, 1800);

    }


});
