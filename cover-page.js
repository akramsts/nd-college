(function () {
    "use strict";

    const fieldMap = [
        ["in-topic", ".out-topic", "Assignment / Project"],
        ["in-session", ".out-session", "Session: 2024-2028", true],
        ["in-name", ".out-name", "Student Name"],
        ["in-sem", ".out-sem", "Semester - I"],
        ["in-roll", ".out-roll", "Roll Number"],
        ["in-reg", ".out-reg", "Registration No"],
        ["in-subject", ".out-subject", "Subject Name"],
        ["in-paper", ".out-paper", "Paper Code/Name"],
    ];

    const A4_WIDTH_PX = 793.7;
    const A4_HEIGHT_PX = 1122.5;

    function fitA4Preview() {
        const wrappers = document.querySelectorAll(".a4-scale-wrapper");
        wrappers.forEach((wrapper) => {
            const sheet = wrapper.querySelector(".a4-sheet");
            if (!sheet) return;

            if (window.innerWidth > 768) {
                sheet.style.transform = "";
                wrapper.style.height = "";
                return;
            }

            const scale = wrapper.clientWidth / A4_WIDTH_PX;
            sheet.style.transform = `scale(${scale})`;
            wrapper.style.height = `${A4_HEIGHT_PX * scale}px`;
        });
    }

    function formatDate(dateStr) {
        if (!dateStr) return "DD / MM / YYYY";
        const parts = dateStr.split("-");
        return `${parts[2]} / ${parts[1]} / ${parts[0]}`;
    }

    function updateBackBtnLabel(onStep2) {
        const btn = document.getElementById("floating-back-btn");
        if (btn) btn.setAttribute("aria-label", onStep2 ? "Back to Edit Details" : "Back to Website");
    }

    function showStep2() {
        const step1 = document.getElementById("step-1");
        const step2 = document.getElementById("step-2");
        step1.classList.remove("active");
        step1.setAttribute("aria-hidden", "true");
        step2.classList.add("active");
        step2.setAttribute("aria-hidden", "false");

        step2.setAttribute("tabindex", "-1");
        step2.focus({ preventScroll: true });

        updateBackBtnLabel(true);
        fitA4Preview();
        window.scrollTo(0, 0);
    }

    function showStep1() {
        const step1 = document.getElementById("step-1");
        const step2 = document.getElementById("step-2");
        step2.classList.remove("active");
        step2.setAttribute("aria-hidden", "true");
        step1.classList.add("active");
        step1.setAttribute("aria-hidden", "false");
        updateBackBtnLabel(false);
        window.scrollTo(0, 0);
    }

    function goToStep2() {
        fieldMap.forEach(([inputId, outputSelector, fallback, addPrefix]) => {
            const inputEl = document.getElementById(inputId);
            const outputElements = document.querySelectorAll(outputSelector);
            if (!inputEl || outputElements.length === 0) return;

            let val = inputEl.value.trim();
            if (val && addPrefix) val = "Session: " + val;

            outputElements.forEach((el) => {
                el.innerText = val || fallback;
            });
        });

        const dateInput = document.getElementById("in-date");
        const dateOutputs = document.querySelectorAll(".out-date");
        if (dateInput && dateOutputs.length > 0) {
            const formattedDate = formatDate(dateInput.value);
            dateOutputs.forEach((el) => (el.innerText = formattedDate));
        }

        showStep2();

        history.pushState({ step: 2 }, "", "#step-2");
    }

    function handleBackBtnClick() {
        const step2 = document.getElementById("step-2");
        if (step2 && step2.classList.contains("active")) {
            history.back();
        } else {
            window.location.href = "index.html";
        }
    }

    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.step === 2) {
            showStep2();
        } else {
            showStep1();
        }
    });

    window.printTemplate = function (btnElement) {
        document.querySelectorAll(".template-wrapper").forEach((w) => w.classList.remove("print-active"));
        const currentWrapper = btnElement.closest(".template-wrapper");
        if (!currentWrapper) return;

        currentWrapper.classList.add("print-active");

        window.setTimeout(() => {
            window.print();
        }, 50);
    };

    window.addEventListener("beforeprint", () => {
        const hasActive = document.querySelector(".template-wrapper.print-active");
        if (!hasActive) {
            const firstWrapper = document.querySelector(".template-wrapper");
            if (firstWrapper) firstWrapper.classList.add("print-active");
        }
    });

    window.addEventListener("afterprint", () => {
        document.querySelectorAll(".template-wrapper").forEach((w) => w.classList.remove("print-active"));
    });

    document.addEventListener("DOMContentLoaded", () => {
        const generateBtn = document.getElementById("generate-btn");
        const backBtn = document.getElementById("floating-back-btn");

        if (generateBtn) generateBtn.addEventListener("click", goToStep2);
        if (backBtn) backBtn.addEventListener("click", handleBackBtnClick);

        window.addEventListener("resize", fitA4Preview);

        if (window.location.hash === "#step-2") {
            history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    });
})();