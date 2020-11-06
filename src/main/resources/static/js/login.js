(function() {
    const createAccountLink = document.querySelector("#create-account-link");
    const signInLink = document.querySelector("#sign-in-link");
    const createAccountContainer = document.querySelector("#create-account-container");
    const loginContainer = document.querySelector("#login-container");
    const userCreationFormEl = document.querySelector("#user-creation-form");
    const successContent = document.querySelector("#success-content");
    const errorContent = document.querySelector("#error-content");
    const successContainer = document.querySelector("#success-container");
    const errorContainer = document.querySelector("#error-container");

    function toggleVisibility(el) {
        el.classList.toggle('invisible');
        el.classList.toggle('transparent');
    }

    function loginContainerAnimationEndHandler(e) {
        toggleVisibility(createAccountContainer);
        toggleVisibility(loginContainer);
        createAccountContainer.classList.toggle('animate__fadeIn');
        e.currentTarget.removeEventListener(e.type, loginContainerAnimationEndHandler);
    }

    function createContainerAnimationEndHandler(e) {
        toggleVisibility(createAccountContainer);
        toggleVisibility(loginContainer);
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
            loginContainer.classList.toggle('animate__fast');
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
            request.onreadystatechange = () => {
                handleUserCreationFormResponse(request);
            };
            request.send(JSON.stringify(formData));
        });
    }

    function handleUserCreationFormResponse(request) {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status >= 200 && request.status < 400) {
                displayMessage(successContent, successContainer, "Success! Account has been created. Please Login");
                signInLink.click();
            }
            else {
                let message = buildErrorMessage(JSON.parse(request.responseText));
                displayMessage(errorContent, errorContainer, message);
            }
        }
    }

    function buildErrorMessage(errors) {
        const allErrors = errors.errors;
        let result = "";
        for (let i = 0; i < allErrors.length; i++) {
            result += allErrors[i] + " ";
        }
        return result;
    }

    function displayMessage(el, parent, message) {
        el.innerHTML = message;
        toggleVisibility(parent);
        parent.classList.toggle('animate__fadeIn');
        window.setTimeout(() => {
            parent.classList.toggle('animate__fadeIn');
            parent.classList.toggle('animate__fadeOut');
        }, 1000);
    }

    function getUserCreationFormData(el) {
        return {
            "username": el[0].value,
            "email": el[1].value,
            "password": el[2].value,
            "confirmPassword": el[3].value
        }
    }

    function toggleAllMessageContainerVisibility() {
        toggleVisibility(successContainer);
        toggleVisibility(errorContainer);
    }

    function main() {
        toggleVisibility(createAccountContainer);
        toggleAllMessageContainerVisibility();
        addEventHandlers();
    }

    main();
})();