export const getText = url => 
    new Promise (
        (resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(text => resolve(text));
        }
    )