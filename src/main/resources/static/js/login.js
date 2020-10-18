(function() {
    const createAccountLink = document.querySelector("#create-account-link");
    const signInLink = document.querySelector("#sign-in-link");
    const createAccountContainer = document.querySelector("#create-account-container");
    const loginContainer = document.querySelector("#login-container");

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
    }

    function main() {
        toggleVisiblity(createAccountContainer);
        addEventHandlers();
    }

    main();
})();