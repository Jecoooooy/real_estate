(function () {
    // make vuetify dialogs movable
    const d = {};
    document.addEventListener("mousedown", (e) => {
    // const closestDialog = e.target.closest(".v-dialog.v-dialog--active");
    const closestDialog = e.target.closest(".v-dialog > .v-overlay__content");
    // console.log(closestDialog)
    if (
        e.button === 0 &&
        closestDialog != null &&
        // e.target.classList.contains("v-card__title")
        e.target.classList.contains("v-card-title")
    ) {
        // element which can be used to move element
        if (e.target.classList.contains("dragFalse") == true) {
        return false;
        }
        
        d.el = closestDialog; // element which should be moved
        d.mouseStartX = e.clientX;
        d.mouseStartY = e.clientY;
        d.elStartX = d.el.getBoundingClientRect().left;
        d.elStartY = d.el.getBoundingClientRect().top;
        d.el.style.position = "fixed";
        d.el.style.margin = 0;
        d.oldTransition = d.el.style.transition;
        d.el.style.transition = "none";
    }
    });
    document.addEventListener("mousemove", (e) => {
    if (d.el === undefined) return;
    d.el.style.left =
        Math.min(
        Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
        window.innerWidth - d.el.getBoundingClientRect().width
        ) + "px";
    d.el.style.top =
        Math.min(
        Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
        window.innerHeight - d.el.getBoundingClientRect().height
        ) + "px";
    });
    document.addEventListener("mouseup", () => {
    if (d.el === undefined) return;
    d.el.style.transition = d.oldTransition;
    d.el = undefined;
    });
    setInterval(() => {
    // prevent out of bounds
    const dialog = document.querySelector(".v-dialog > .v-overlay__content");
    if (dialog === null) return;
    dialog.style.left =
        Math.min(
        parseInt(dialog.style.left),
        window.innerWidth - dialog.getBoundingClientRect().width
        ) + "px";
    dialog.style.top =
        Math.min(
        parseInt(dialog.style.top),
        window.innerHeight - dialog.getBoundingClientRect().height
        ) + "px";
    }, 100);
})();