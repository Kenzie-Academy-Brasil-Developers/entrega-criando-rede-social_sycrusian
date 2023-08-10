function handleModal(event) {
    const dialog = document.getElementById("dialog__controller");
    const content = event.currentTarget.parentNode.parentNode.cloneNode(true);
    dialog.innerHTML = "";
    dialog.appendChild(generateDialog(dialog, content));
    dialog.showModal();
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

function renderPage() {
    renderSuggestions(suggestUsers);
    renderPosts(posts);
    handleFollows();
    handleNewPost();
}

function renderSuggestions(suggestions) {
    const suggestionList = document.querySelector(".suggestion__list");
    suggestionList.innerHTML = "";
    suggestions.forEach((suggestion) => {
        const suggestionItem = renderSuggestion(suggestion);
        suggestionList.appendChild(suggestionItem);
    });
}

function renderPosts(posts) {
    const postsContainer = document.querySelector(".posts__container");
    const postsTitle = document.querySelector(".posts__container > h2");
    postsContainer.innerHTML = "";
    postsContainer.appendChild(postsTitle);
    posts.forEach((post) => {
        const postArticle = renderPost(post);
        postsContainer.appendChild(postArticle);
    });
}

function renderSuggestion(suggestion) {
    const suggestionItem = document.createElement("li");
    suggestionItem.classList.add("suggestion__item");
    const suggestionUser = renderUser(suggestion);
    const followButton = document.createElement("button");
    followButton.classList.add("follow__button", "text-2--bold");
    followButton.innerText = "Seguir";
    suggestionItem.append(suggestionUser, followButton);
    return suggestionItem;
}

function renderPost(post) {
    const postArticle = document.createElement("article");
    postArticle.classList.add("post__article");
    const userContainer = renderUser({user: post.user, stack: post.stack, img: post.img});
    const postTitle = document.createElement("h2");
    postTitle.classList.add("post__title", "title-1");
    postTitle.innerText = post.title;
    const postText = document.createElement("p");
    postText.classList.add("post__text", "text-1", "post__text--shorten");
    postText.innerText = post.text;
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("post-footer__container");
    const openButton = document.createElement("button");
    openButton.classList.add("open-post__button", "text-2--bold");
    openButton.innerText = "Abrir Post";
    openButton.addEventListener("click", (event) => handleModal(event));
    const likeContainer = document.createElement("div");
    likeContainer.addEventListener("click", () => handleLikes(likeContainer));
    const likeHeart = document.createElement("img");
    likeHeart.src = "src/assets/img/heart-gray.svg";
    likeHeart.alt = "Empty Heart(Post not liked)";
    const likeCounter = document.createElement("small");
    likeCounter.innerText = post.likes;
    likeContainer.append(likeHeart, likeCounter);
    footerContainer.append(openButton, likeContainer);
    postArticle.append(userContainer, postTitle, postText, footerContainer);
    return postArticle;
}

function renderUser(user) {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user__container");
    const userImage = document.createElement("img");
    userImage.classList.add("user__img");
    userImage.src = user.img;
    userImage.alt = user.user;
    const userInfo = document.createElement("div");
    userInfo.classList.add("user__info");
    const userName = document.createElement("h2");
    userName.classList.add("title-2");
    userName.innerText = user.user;
    const userStack = document.createElement("p");
    userStack.classList.add("text-2", "grey-2");
    userStack.innerText = user.stack;
    userInfo.append(userName, userStack);
    userContainer.append(userImage, userInfo);
    return userContainer;
}

function handleFollows() {
    const buttons = document.querySelectorAll(".follow__button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            button.innerText == "Seguir" ? button.innerText = "Seguindo" : button.innerText = "Seguir";
            button.classList.toggle("follow__button--pressed");
        });
    })
}

function handleLikes(button) {
    const heart = button.childNodes[0];
    const counter = button.childNodes[1];
    let counterValue = parseInt(counter.innerText);
    if (heart.alt == "Empty Heart(Post not liked)") {
        heart.src = "src/assets/img/heart-red.svg";
        heart.alt = "Full Heart(Post liked)";
        counterValue += 1;
    }
    else {
        heart.src = "src/assets/img/heart-gray.svg";
        heart.alt = "Empty Heart(Post not liked)";
        counterValue -= 1;
    }
    counter.innerText = counterValue;
}

function handleNewPost() { 
    const button = document.querySelector(".new-post__button");
    const inputTitle = document.querySelector(".new-post__title");
    const inputText = document.querySelector(".new-post__text");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        if (inputTitle.value.trim() != "" && inputText.value.trim() != "") {
            const userContainer = document.querySelector(".new-post__container > .user__container");
            const userImage = userContainer.childNodes[1].src;
            const userName = userContainer.childNodes[3].childNodes[1].innerText;
            const userStack = userContainer.childNodes[3].childNodes[3].innerText;
            const postId = posts.reduce((max, post) => post.id > max.id ? post : max).id + 1;
            const newPost = {
                id: postId,
                title: inputTitle.value.trim(),
                text: inputText.value.trim(),
                user: userName,
                stack: userStack,
                img: userImage,
                likes: 0
            };
            posts.unshift(newPost);
            const renderedPost = renderPost(newPost);
            const postsContainer = document.querySelector(".posts__container");
            const firstArticle = document.querySelector(".posts__container > article");
            postsContainer.insertBefore(renderedPost, firstArticle);
        }
        inputTitle.value = "";
        inputText.value = "";
    })
}

renderPage();
