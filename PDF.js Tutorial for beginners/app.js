const url = "/dummy.pdf";

(async function () {

    // Specified the workerSrc property
    pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";

    // Create the PDF document
    const doc = await pdfjsLib.getDocument(url).promise;

    const minPage = 1;
    const maxPage = doc._pdfInfo.numPages;
    let currentPage = 1;

    // Get page 1
    await getPage(doc, currentPage);

    // Display the page number
    document.getElementById("pageNumber").innerHTML = `Page ${currentPage} of ${maxPage}`;

    // The previous button click event
    document.getElementById("previous").addEventListener("click", async () => {

        if (currentPage > minPage) {

            // Get the previous page
            await getPage(doc, currentPage--);

            // Display the page number
            document.getElementById("pageNumber").innerHTML = `Page ${currentPage} of ${maxPage}`;

        }

    });

    // The next button click event
    document.getElementById("next").addEventListener("click", async () => {

        if (currentPage < maxPage) {

            // Get the next page
            await getPage(doc, currentPage++);

            // Display the page number
            document.getElementById("pageNumber").innerHTML = `Page ${currentPage} of ${maxPage}`;

        }

    });

})();


async function getPage(doc, pageNumber) {

    if (pageNumber >= 1 && pageNumber <= doc._pdfInfo.numPages) {

        // Fetch the page
        const page = await doc.getPage(pageNumber);

        // Set the viewport
        const viewport = page.getViewport({ scale: 1.5 });

        // Set the canvas dimensions to the PDF page dimensions
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the PDF page into the canvas context
        return await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

    } else {
        console.log("Please specify a valid page number");
    }

}