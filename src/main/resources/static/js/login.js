(function() {
    const createAccountLink = document.querySelector("#create-account-link");
    const signInLink = document.querySelector("#sign-in-link");
    const createAccountContainer = document.querySelector("#create-account-container");
    const loginContainer = document.querySelector("#login-container");
    const userCreationFormEl = document.querySelector("#user-creation-form");

    function toggleVisiblity(el) {
        el.classList.toggle('invisible');
        el.classList.toggle('transparent');
    }

    function loginContainerAnimationEndHandler(e) {
        toggleVisiblity(createAccountContainer);
        toggleVisiblity(loginContainer);
        createAccountContainer.classList.toggle('animate__fadeIn');
        e.currentTarget.removeEventListener(e.type, loginContainerAnimationEndHandler);
    }

    function createContainerAnimationEndHandler(e) {
        toggleVisiblity(createAccountContainer);
        toggleVisiblity(loginContainer);
        loginContainer.classList.toggle('animate__fadeIn');
        e.currentTarget.removeEventListener(e.type, createContainerAnimationEndHandler);
    }

    function resetFade(el) {
        el.classList.remove('animate__fadeIn');
        el.classList.remove('animate__fadeOut');
    }

    function addEventHandlers() {
        createAccountLink.addEventListener('click', (e) => {
            resetFade(loginContainer);
            resetFade(createAccountContainer);
            loginContainer.addEventListener('animationend', loginContainerAnimationEndHandler);
            loginContainer.classList.toggle('animate__fadeOut');
        });

        signInLink.addEventListener('click', (e) => {
            resetFade(loginContainer);
            resetFade(createAccountContainer);
            createAccountContainer.addEventListener('animationend', createContainerAnimationEndHandler);
            createAccountContainer.classList.toggle('animate__fadeOut');
        });

        userCreationFormEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const request = new XMLHttpRequest();
            const url = "/api/create-user";

            let formData = getUserCreationFormData(userCreationFormEl);
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(JSON.stringify(formData));
        });
    }

    function getUserCreationFormData(el) {
        return {
            "username": el[0].value,
            "email": el[1].value,
            "password": el[2].value,
            "confirmPassword": el[3].value
        }
    }

    function main() {
        toggleVisiblity(createAccountContainer);
        addEventHandlers();
    }

    main();
})();