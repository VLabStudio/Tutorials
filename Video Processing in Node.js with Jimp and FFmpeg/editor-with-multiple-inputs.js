// Import dependencies
const Jimp = require("jimp");
const fs = require("fs-extra");
const util = require("util");
// const moment = require("moment");

const exec = util.promisify(require("child_process").exec);

const debug = false;
const videoEncoder = "h264"; // mpeg4 libvpx
const inputs = ["input1.mp4", "input2.mp4"];
const output = "output.mp4";

(async function () {

    try {

        console.log("Initializing temporary files");
        await fs.mkdir("temp");
        await fs.mkdir("temp/clips");
        await fs.mkdir("temp/raw-frames");
        await fs.mkdir("temp/edited-frames");

        console.log("Decoding");

        for (let index = 0; index < inputs.length; index++) {
            await fs.mkdir(`temp/clips/${index}`);
            await exec(`ffmpeg -i ${inputs[index]} temp/clips/${index}/%d.png`);

        }

        console.log("Combining frames");
        const clips = fs.readdirSync("temp/clips");
        let globalFrameCount = 1

        for (const clip of clips) {

            const frames = fs.readdirSync(`temp/clips/${clip}`);

            for (let count = 1; count <= frames.length; count++) {
                fs.moveSync(`temp/clips/${clip}/${count}.png`, `temp/raw-frames/${globalFrameCount}.png`);
                globalFrameCount++;
            }

        }

        console.log("Rendering");
        const frames = fs.readdirSync("temp/raw-frames");

        for (let count = 1; count <= frames.length; count++) {

            // Read the frame
            let frame = await Jimp.read(`temp/raw-frames/${count}.png`);

            // Modified the frame
            frame = await onFrame(frame, count);

            // Save the frame
            await frame.writeAsync(`temp/edited-frames/${count}.png`);

        }

        console.log("Encoding");
        await exec(`ffmpeg -start_number 1 -i temp/edited-frames/%d.png -vcodec ${videoEncoder} -filter:v "setpts=0.5*PTS" temp/no-audio.mp4`);

        // Note that the audio part doesn't work
        // Export the video without audio
        fs.moveSync(`temp/no-audio.mp4`, output);

        // console.log("Adding audio");
        // let offsetTime = moment().month(0).date(0).hours(0).minutes(0).seconds(0).milliseconds(0);

        // for (const input of inputs) {

        //     await exec(`ffmpeg -itsoffset ${offsetTime.format("HH:mm:ss.SSS")} -i temp/no-audio.mp4 -i ${input} -c copy -map 0:v:0 -map 1:a:0 ${output}`);

        //     const offset = /(\d+):(\d+):(\d+)\.(\d+)/.exec((await exec(`ffprobe -i ${input} -show_entries format=duration -v quiet -of csv="p=0" -sexagesimal`)).stdout.trim());

        //     offsetTime.add(offset[1], "hours");
        //     offsetTime.add(offset[2], "minutes");
        //     offsetTime.add(offset[3], "seconds");
        //     // offsetTime.add(offset[4], "milliseconds");

        // }

        console.log("Cleaning up");
        await fs.remove("temp");

    } catch (error) {

        console.log("An error occurred:", error);

        if (debug === false) {

            await fs.remove("temp");

        }

    }

})();

async function onFrame(frame, frameCount) {

    if (frameCount < 5) {

        frame = new Jimp(frame.bitmap.width, frame.bitmap.height, 0xff0000ff, (err, image) => { });

    } else {

        // Add text
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        frame.print(font, 0, 0, `Frame Count: ${frameCount}`);

        // Manual manipulation
        frame.scan(0, 0, frame.bitmap.width, frame.bitmap.height, function (x, y, idx) {

            // Get the colors
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];
            const alpha = this.bitmap.data[idx + 3];

            // If x is less than y
            if (x < y) {

                // Set the blue channel to 255
                this.bitmap.data[idx + 2] = 255;

            }

        });

    }

    return frame;
}