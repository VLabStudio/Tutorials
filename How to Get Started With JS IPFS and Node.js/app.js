// Import dependencies
const IPFS = require("ipfs"); // vs js-ipfs-http-client

(async () => {

    const node = await IPFS.create();
    console.log("Node started!");

    try {

        const files = [{
            path: "/tmp/myfile2.txt",
            content: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>IPFS</title>
                    </head>
                    <body>
                        <h1>Hi Node.js</h1>
                    </body>
                </html>
            `
        }];

        const file = {
            path: "/tmp/myfile2.txt",
            content: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>IPFS</title>
                    </head>
                    <body>
                        <h1>Hi Node.js 4</h1>
                    </body>
                </html>
                `
        };

        // for await (const result of node.add(file)) {
        //     console.log(result.cid.toString());
        // }

        // for await (const result of node.cat("Qma8GKVh93ogeAQ4FYBXmZDjKbb68RnhkWt16AyWnMA5h9")) {
        //     console.log(result.toString());
        // }

        // Generator functions - https://stackoverflow.com/questions/44593309/object-generator-function-not-doing-what-it-should-and-returning-no-result
        console.log((await node.cat("Qma8GKVh93ogeAQ4FYBXmZDjKbb68RnhkWt16AyWnMA5h9").next()).value.toString());


    } catch (error) {
        console.error("Node failed to start!", error);
        await node.stop();
    }

})();