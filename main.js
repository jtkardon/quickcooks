function main() {
    //You have to use the callapi function like this.
    //It's asynchronous so it's gotta be like this
    CallAPI("chicken breast").then(data => {
        console.log("API Call Result:", data);
    });
}