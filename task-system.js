/* =========================================================
   MEMORA - GLOBAL TASK SYSTEM
   ---------------------------------------------------------
   One task system shared by:
   Dashboard
   Tasks
   Calendar
   Progress
   ========================================================= */

(function () {
    "use strict";

    const STORAGE_KEY = "memoraTasks";
    const PROFILE_KEY = "memoraProfile";

    /* =====================================================
       STORAGE
       ===================================================== */

    function getTasks() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            console.error("Could not load tasks:", error);
            return [];
        }
    }

    function saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

        /*
         * This lets other tabs/pages know that tasks changed.
         */
        window.dispatchEvent(
            new CustomEvent("memoraTasksUpdated")
        );
    }

    function createId() {
        return Date.now().toString() + Math.random()
            .toString(36)
            .substring(2, 8);
    }

    /* =====================================================
       DATE HELPERS
       ===================================================== */

    function getToday() {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function formatDate(dateString) {
        if (!dateString) {
            return "";
        }

        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function formatTime(time) {
        if (!time) {
            return "";
        }

        const parts = time.split(":");

        let hour = parseInt(parts[0], 10);
        const minute = parts[1];

        const suffix = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;

        if (hour === 0) {
            hour = 12;
        }

        return `${hour}:${minute} ${suffix}`;
    }

    /* =====================================================
       HTML SAFETY
       ===================================================== */

    function escapeHTML(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =====================================================
       CREATE TASK MODAL
       ===================================================== */

    function createTaskModal() {

        if (document.getElementById("globalTaskModal")) {
            return;
        }

        const modal = document.createElement("div");

        modal.id = "globalTaskModal";
        modal.className = "global-task-modal";

        modal.innerHTML = `
            <div class="global-task-modal-box">

                <div class="global-task-modal-header">

                    <div>
                        <p class="global-modal-label">
                            MEMORA
                        </p>

                        <h2>Create New Task</h2>

                        <p>
                            Add a task to your study plan.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="global-close-task"
                        id="globalCloseTask"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>

                <form id="globalTaskForm">

                    <div class="global-form-group">

                        <label for="globalTaskName">
                            Task Name
                        </label>

                        <input
                            type="text"
                            id="globalTaskName"
                            placeholder="e.g. JavaScript Promises"
                            required
                        >

                    </div>

                    <div class="global-form-group">

                        <label for="globalTaskSubject">
                            Subject / Project
                        </label>

                        <input
                            type="text"
                            id="globalTaskSubject"
                            placeholder="e.g. JavaScript"
                            required
                        >

                    </div>

                    <div class="global-form-row">

                        <div class="global-form-group">

                            <label for="globalTaskDate">
                                Date
                            </label>

                            <input
                                type="date"
                                id="globalTaskDate"
                                required
                            >

                        </div>

                        <div class="global-form-group">

                            <label for="globalTaskTime">
                                Time
                            </label>

                            <input
                                type="time"
                                id="globalTaskTime"
                            >

                        </div>

                    </div>

                    <div class="global-form-row">

                        <div class="global-form-group">

                            <label for="globalTaskPriority">
                                Priority
                            </label>

                            <select id="globalTaskPriority">

                                <option value="High">
                                    High
                                </option>

                                <option value="Medium" selected>
                                    Medium
                                </option>

                                <option value="Low">
                                    Low
                                </option>

                            </select>

                        </div>

                        <div class="global-form-group">

                            <label for="globalTaskType">
                                Type
                            </label>

                            <select id="globalTaskType">

                                <option value="Study">
                                    Study
                                </option>

                                <option value="Revision">
                                    Revision
                                </option>

                                <option value="Assignment">
                                    Assignment
                                </option>

                                <option value="Exam">
                                    Exam
                                </option>

                                <option value="Project">
                                    Project
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>

                    <div class="global-form-group">

                        <label for="globalTaskDescription">
                            Description
                        </label>

                        <textarea
                            id="globalTaskDescription"
                            rows="3"
                            placeholder="Add a short description..."
                        ></textarea>

                    </div>

                    <div
                        class="global-task-error"
                        id="globalTaskError"
                    ></div>

                    <div class="global-form-actions">

                        <button
                            type="button"
                            class="global-cancel-task"
                            id="globalCancelTask"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="global-save-task"
                        >
                            + Create Task
                        </button>

                    </div>

                </form>

            </div>
        `;

        document.body.appendChild(modal);

        const dateInput =
            document.getElementById("globalTaskDate");

        dateInput.value = getToday();

        document
            .getElementById("globalCloseTask")
            .addEventListener("click", closeTaskModal);

        document
            .getElementById("globalCancelTask")
            .addEventListener("click", closeTaskModal);

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeTaskModal();
            }

        });

        document
            .getElementById("globalTaskForm")
            .addEventListener("submit", handleCreateTask);

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                const currentModal =
                    document.getElementById("globalTaskModal");

                if (
                    currentModal &&
                    currentModal.classList.contains("show")
                ) {
                    closeTaskModal();
                }

            }

        });
    }

    function openTaskModal() {

        createTaskModal();

        const modal =
            document.getElementById("globalTaskModal");

        const dateInput =
            document.getElementById("globalTaskDate");

        if (dateInput && !dateInput.value) {
            dateInput.value = getToday();
        }

        modal.classList.add("show");

        setTimeout(function () {

            const nameInput =
                document.getElementById("globalTaskName");

            if (nameInput) {
                nameInput.focus();
            }

        }, 100);
    }

    function closeTaskModal() {

        const modal =
            document.getElementById("globalTaskModal");

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        const form =
            document.getElementById("globalTaskForm");

        if (form) {
            form.reset();
        }

        const dateInput =
            document.getElementById("globalTaskDate");

        if (dateInput) {
            dateInput.value = getToday();
        }

        const error =
            document.getElementById("globalTaskError");

        if (error) {
            error.textContent = "";
        }
    }

    /* =====================================================
       CREATE TASK
       ===================================================== */

    function handleCreateTask(event) {

        event.preventDefault();

        const name =
            document
                .getElementById("globalTaskName")
                .value
                .trim();

        const subject =
            document
                .getElementById("globalTaskSubject")
                .value
                .trim();

        const date =
            document
                .getElementById("globalTaskDate")
                .value;

        const time =
            document
                .getElementById("globalTaskTime")
                .value;

        const priority =
            document
                .getElementById("globalTaskPriority")
                .value;

        const type =
            document
                .getElementById("globalTaskType")
                .value;

        const description =
            document
                .getElementById("globalTaskDescription")
                .value
                .trim();

        const error =
            document.getElementById("globalTaskError");

        if (!name) {

            error.textContent =
                "Please enter a task name.";

            return;
        }

        if (!subject) {

            error.textContent =
                "Please enter a subject or project.";

            return;
        }

        if (!date) {

            error.textContent =
                "Please select a date.";

            return;
        }

        const task = {

            id: createId(),

            name: name,

            subject: subject,

            date: date,

            time: time || "",

            priority: priority,

            type: type,

            description: description,

            completed: false,

            createdAt: new Date().toISOString()

        };

        const tasks = getTasks();

        tasks.push(task);

        saveTasks(tasks);

        closeTaskModal();

        renderEverywhere();

        showToast("Task created successfully!");

    }

    /* =====================================================
       OPEN BUTTONS
       ===================================================== */

    function connectCreateButtons() {

        document
            .querySelectorAll(
                "[data-create-task], #globalCreateTaskBtn"
            )
            .forEach(function (button) {

                if (button.dataset.taskConnected === "true") {
                    return;
                }

                button.dataset.taskConnected = "true";

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        openTaskModal();

                    }
                );

            });

    }

    /* =====================================================
       DASHBOARD
       ===================================================== */

    function renderDashboard() {

        const tasks = getTasks();

        const today = getToday();

        /*
         * Today's Plan
         */

        const dashboardTaskList =
            document.querySelector(
                ".content-card .task-list"
            );

        if (dashboardTaskList) {

            const todayTasks =
                tasks.filter(function (task) {

                    return task.date === today;

                });

            if (todayTasks.length === 0) {

                dashboardTaskList.innerHTML = `
                    <div class="empty-task-message">
                        No tasks for today.
                        Click <strong>Create Task</strong>
                        to add one.
                    </div>
                `;

            } else {

                dashboardTaskList.innerHTML =
                    todayTasks
                        .slice(0, 5)
                        .map(function (task) {

                            return `
                                <div
                                    class="task-item global-dashboard-task
                                    ${task.completed ? "completed" : ""}"
                                    data-task-id="${escapeHTML(task.id)}"
                                >

                                    <button
                                        class="task-check global-task-checkbox"
                                        type="button"
                                        data-task-id="${escapeHTML(task.id)}"
                                        aria-label="Mark task complete"
                                    >
                                        ${task.completed ? "✓" : ""}
                                    </button>

                                    <div class="task-info">

                                        <h3>
                                            ${escapeHTML(task.name)}
                                        </h3>

                                        <p>
                                            ${escapeHTML(task.subject)}
                                        </p>

                                    </div>

                                    <span class="task-time">
                                        ${task.time
                                    ? escapeHTML(
                                        formatTime(task.time)
                                    )
                                    : escapeHTML(
                                        task.priority
                                    )
                                }
                                    </span>

                                </div>
                            `;

                        })
                        .join("");

            }

        }

        /*
         * Statistics
         */

        const total =
            tasks.length;

        const completed =
            tasks.filter(function (task) {
                return task.completed;
            }).length;

        updateDashboardStat(
            "Topics",
            total
        );

        updateDashboardStat(
            "Completed",
            completed
        );
    }

    function updateDashboardStat(label, value) {

        const cards =
            document.querySelectorAll(
                ".stat-card"
            );

        cards.forEach(function (card) {

            const paragraph =
                card.querySelector("p");

            const heading =
                card.querySelector("h3");

            if (
                paragraph &&
                heading &&
                paragraph.textContent.trim() === label
            ) {
                heading.textContent = value;
            }

        });
    }

    /* =====================================================
       TASK PAGE
       ===================================================== */

    function renderTaskPage() {

        const todayList =
            document.getElementById("todayTaskList");

        if (!todayList) {
            return;
        }

        const tasks = getTasks();

        const today = getToday();

        const todayTasks =
            tasks.filter(function (task) {

                return task.date === today;

            });

        /*
         * We only replace dynamically created task items.
         * Existing demo tasks remain untouched if there are
         * no saved tasks.
         */

        let dynamicContainer =
            document.getElementById(
                "globalSavedTasks"
            );

        if (!dynamicContainer) {

            dynamicContainer =
                document.createElement("div");

            dynamicContainer.id =
                "globalSavedTasks";

            todayList.appendChild(
                dynamicContainer
            );
        }

        if (todayTasks.length === 0) {

            dynamicContainer.innerHTML = "";

            return;
        }

        dynamicContainer.innerHTML =
            todayTasks
                .map(function (task) {

                    return `
                        <div
                            class="task global-task-row
                            ${task.completed ? "completed" : ""}"
                            data-task-id="${escapeHTML(task.id)}"
                        >

                            <input
                                type="checkbox"
                                class="global-task-checkbox-input"
                                data-task-id="${escapeHTML(task.id)}"
                                ${task.completed ? "checked" : ""}
                            >

                            <div class="task-content">

                                <h3>
                                    ${escapeHTML(task.name)}
                                </h3>

                                <p>
                                    ${escapeHTML(task.subject)}
                                    ${task.time
                            ? " · " +
                            escapeHTML(
                                formatTime(task.time)
                            )
                            : ""
                        }
                                </p>

                            </div>

                            <span class="task-priority">
                                ${escapeHTML(task.priority)}
                            </span>

                        </div>
                    `;

                })
                .join("");

    }

    /* =====================================================
       COMPLETE / UNCOMPLETE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".global-task-checkbox"
                );

            if (!button) {
                return;
            }

            const id =
                button.dataset.taskId;

            toggleTask(id);

        }
    );

    document.addEventListener(
        "change",
        function (event) {

            const checkbox =
                event.target.closest(
                    ".global-task-checkbox-input"
                );

            if (!checkbox) {
                return;
            }

            const id =
                checkbox.dataset.taskId;

            toggleTask(
                id,
                checkbox.checked
            );

        }
    );

    function toggleTask(id, forceValue) {

        const tasks = getTasks();

        const task =
            tasks.find(function (item) {

                return String(item.id) === String(id);

            });

        if (!task) {
            return;
        }

        if (typeof forceValue === "boolean") {

            task.completed =
                forceValue;

        } else {

            task.completed =
                !task.completed;

        }

        task.completedAt =
            task.completed
                ? new Date().toISOString()
                : null;

        saveTasks(tasks);

        renderEverywhere();

    }

    /* =====================================================
       CALENDAR
       ===================================================== */

    function renderCalendarTasks() {

        const tasks =
            getTasks();

        /*
         * Existing calendar cells can optionally use:
         *
         * data-date="2026-10-05"
         *
         * The system automatically adds task information.
         */

        document
            .querySelectorAll(
                ".day[data-date]"
            )
            .forEach(function (day) {

                const date =
                    day.dataset.date;

                const dayTasks =
                    tasks.filter(function (task) {

                        return task.date === date;

                    });

                let taskContainer =
                    day.querySelector(
                        ".global-calendar-tasks"
                    );

                if (!taskContainer) {

                    taskContainer =
                        document.createElement("div");

                    taskContainer.className =
                        "global-calendar-tasks";

                    day.appendChild(
                        taskContainer
                    );

                }

                taskContainer.innerHTML =
                    dayTasks
                        .slice(0, 3)
                        .map(function (task) {

                            return `
                                <small
                                    class="calendar-task-dot
                                    ${task.completed ? "completed" : ""}"
                                >
                                    ${task.completed
                                    ? "✓ "
                                    : ""
                                }
                                    ${escapeHTML(task.name)}
                                </small>
                            `;

                        })
                        .join("");

            });
    }

    /* =====================================================
       PROGRESS
       ===================================================== */

    function renderProgress() {

        const tasks =
            getTasks();

        const total =
            tasks.length;

        const completed =
            tasks.filter(function (task) {

                return task.completed;

            }).length;

        const pending =
            total - completed;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                );

        /*
         * These data attributes can be added to existing
         * progress elements without changing their design.
         */

        const totalElement =
            document.querySelector(
                "[data-progress-total]"
            );

        const completedElement =
            document.querySelector(
                "[data-progress-completed]"
            );

        const pendingElement =
            document.querySelector(
                "[data-progress-pending]"
            );

        const percentageElement =
            document.querySelector(
                "[data-progress-percentage]"
            );

        if (totalElement) {
            totalElement.textContent = total;
        }

        if (completedElement) {
            completedElement.textContent = completed;
        }

        if (pendingElement) {
            pendingElement.textContent = pending;
        }

        if (percentageElement) {
            percentageElement.textContent =
                percentage + "%";
        }

    }

    /* =====================================================
       PROFILE
       ===================================================== */

    function createProfileButton() {

        const profile =
            getProfile();

        document
            .querySelectorAll(
                "[data-profile-button]"
            )
            .forEach(function (button) {

                button.innerHTML = `
                    <span class="profile-avatar">
                        ${escapeHTML(
                    getInitials(profile.name)
                )}
                    </span>

                    <span class="profile-button-name">
                        ${escapeHTML(profile.name)}
                    </span>

                    <span class="profile-arrow">
                        ▾
                    </span>
                `;

            });

    }

    function getProfile() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    PROFILE_KEY
                )
            ) || {
                name: "Janwi",
                email: ""
            };

        } catch (error) {

            return {
                name: "Janwi",
                email: ""
            };

        }

    }

    function getInitials(name) {

        if (!name) {
            return "J";
        }

        return name
            .split(" ")
            .map(function (part) {

                return part.charAt(0);

            })
            .join("")
            .substring(0, 2)
            .toUpperCase();

    }

    function createProfileMenu() {

        if (
            document.getElementById(
                "memoraProfileMenu"
            )
        ) {
            return;
        }

        const menu =
            document.createElement("div");

        menu.id =
            "memoraProfileMenu";

        menu.className =
            "memora-profile-menu";

        menu.innerHTML = `

            <div class="profile-menu-header">

                <div class="profile-menu-avatar">
                    ${escapeHTML(
            getInitials(
                getProfile().name
            )
        )}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(
            getProfile().name
        )}
                    </strong>

                    <span>
                        ${escapeHTML(
            getProfile().email ||
            "Student account"
        )}
                    </span>

                </div>

            </div>

            <div class="profile-menu-divider"></div>

            <button
                type="button"
                data-profile-action="profile"
            >
                👤 Profile
            </button>

            <button
                type="button"
                data-profile-action="settings"
            >
                ⚙️ Settings
            </button>

            <button
                type="button"
                data-profile-action="workspace"
            >
                💼 Workspace
            </button>

            <div class="profile-menu-divider"></div>

            <button
                type="button"
                data-profile-action="logout"
                class="profile-logout"
            >
                ↪ Log out
            </button>

        `;

        document.body.appendChild(menu);

        menu.addEventListener(
            "click",
            function (event) {

                const actionButton =
                    event.target.closest(
                        "[data-profile-action]"
                    );

                if (!actionButton) {
                    return;
                }

                const action =
                    actionButton.dataset
                        .profileAction;

                handleProfileAction(action);

            }
        );

    }

    function connectProfileButtons() {

        createProfileMenu();

        document
            .querySelectorAll(
                "[data-profile-button]"
            )
            .forEach(function (button) {

                if (
                    button.dataset.profileConnected ===
                    "true"
                ) {
                    return;
                }

                button.dataset.profileConnected =
                    "true";

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        toggleProfileMenu(
                            button
                        );

                    }
                );

            });

        document.addEventListener(
            "click",
            function () {

                closeProfileMenu();

            }
        );

    }

    function toggleProfileMenu(button) {

        const menu =
            document.getElementById(
                "memoraProfileMenu"
            );

        if (!menu) {
            return;
        }

        const isOpen =
            menu.classList.contains("show");

        if (isOpen) {

            closeProfileMenu();

            return;

        }

        const rect =
            button.getBoundingClientRect();

        menu.style.top =
            `${rect.bottom + 10}px`;

        menu.style.right =
            `${Math.max(
                15,
                window.innerWidth - rect.right
            )}px`;

        menu.classList.add("show");

    }

    function closeProfileMenu() {

        const menu =
            document.getElementById(
                "memoraProfileMenu"
            );

        if (menu) {
            menu.classList.remove("show");
        }

    }

    function handleProfileAction(action) {

        closeProfileMenu();

        if (action === "profile") {

            showToast(
                "Profile page coming soon."
            );

        }

        if (action === "settings") {

            showToast(
                "Settings page coming soon."
            );

        }

        if (action === "workspace") {

            showToast(
                "Workspace coming soon."
            );

        }

        if (action === "logout") {

            showToast(
                "Frontend logout is not connected yet."
            );

        }

    }

    /* =====================================================
       AUTOMATIC HEADER BUTTONS
       ===================================================== */

    function addGlobalHeaderButtons() {

        /*
         * Dashboard
         */

        const dashboardHeader =
            document.querySelector(
                ".topbar"
            );

        if (
            dashboardHeader &&
            !dashboardHeader.querySelector(
                ".global-header-actions"
            )
        ) {

            const actions =
                createHeaderActions();

            dashboardHeader.appendChild(
                actions
            );

        }

        /*
         * Tasks page
         */

        const taskHeader =
            document.querySelector(
                ".header"
            );

        if (
            taskHeader &&
            !taskHeader.querySelector(
                ".global-header-actions"
            )
        ) {

            const actions =
                createHeaderActions();

            taskHeader.appendChild(
                actions
            );

        }

        /*
         * Calendar / Progress
         */

        const pageHeaders =
            document.querySelectorAll(
                ".page-header"
            );

        pageHeaders.forEach(function (header) {

            if (
                header.querySelector(
                    ".global-header-actions"
                )
            ) {
                return;
            }

            header.appendChild(
                createHeaderActions()
            );

        });

    }

    function createHeaderActions() {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "global-header-actions";

        wrapper.innerHTML = `

            <button
                type="button"
                class="global-create-task-button"
                data-create-task
            >
                <span>+</span>
                Create Task
            </button>

            <button
                type="button"
                class="global-profile-button"
                data-profile-button
                aria-label="Open profile"
            >
            </button>

        `;

        return wrapper;

    }

    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        let toast =
            document.getElementById(
                "memoraToast"
            );

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "memoraToast";

            toast.className =
                "memora-toast";

            document.body.appendChild(
                toast
            );

        }

        toast.textContent =
            message;

        toast.classList.add("show");

        clearTimeout(
            toast._timeout
        );

        toast._timeout =
            setTimeout(function () {

                toast.classList.remove(
                    "show"
                );

            }, 2500);

    }

    /* =====================================================
       RENDER EVERYTHING
       ===================================================== */

    function renderEverywhere() {

        renderDashboard();

        renderTaskPage();

        renderCalendarTasks();

        renderProgress();

        createProfileButton();

    }

    /* =====================================================
       INIT
       ===================================================== */

    function init() {

        createTaskModal();

        addGlobalHeaderButtons();

        connectCreateButtons();

        connectProfileButtons();

        renderEverywhere();

        /*
         * Listen for task changes from other tabs.
         */

        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key === STORAGE_KEY
                ) {
                    renderEverywhere();
                }

            }
        );

        window.addEventListener(
            "memoraTasksUpdated",
            function () {

                renderEverywhere();

            }
        );

    }

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
