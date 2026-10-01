/* =========================================
   MEMORA THEME TOGGLE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const themeText =
        document.getElementById("themeText");


    /* -----------------------------------------
       Check saved theme
    ----------------------------------------- */

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


    /* -----------------------------------------
       Toggle theme
    ----------------------------------------- */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const isDark =
                    document.documentElement.classList.toggle(
                        "dark-mode"
                    );


                /* Save theme */

                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                /* Update button */

                updateThemeUI(isDark);

            }
        );

    }


    /* -----------------------------------------
       Update toggle UI
    ----------------------------------------- */

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

});
