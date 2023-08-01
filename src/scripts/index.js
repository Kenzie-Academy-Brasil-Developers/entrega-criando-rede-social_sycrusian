function handleModal() {
    const dialog = document.getElementById("dialog__controller");
    const buttons = document.querySelectorAll(".open-post__button");

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener("click", function(event) {
            const content = event.currentTarget.parentNode.parentNode.cloneNode(true);
            dialog.innerHTML = "";
            dialog.appendChild(generateDialog(dialog, content));
            dialog.showModal();
        })
    }
}

function generateDialog(dialog, content) {
    const container = document.createElement("div");
    container.classList.add("dialog__container");

    const header = document.createElement("div");
    header.classList.add("dialog__header");
    header.appendChild(content.querySelector(".user__container"));

    const closeButton = document.createElement("button");
    closeButton.classList.add("button__close");
    closeButton.addEventListener("click", function() {
        dialog.close();
    })
    header.appendChild(closeButton);

    const text = content.querySelector(".post__text");
    text.classList.remove("post__text--shorten");

    container.appendChild(header);
    container.appendChild(content.querySelector(".post__title"));
    container.appendChild(text);

    return container;
}

handleModal();