

function resolveAfterFourSeconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success");
        }, 4000);
    });
}