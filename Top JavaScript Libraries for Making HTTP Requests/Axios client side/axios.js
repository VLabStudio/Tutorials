// Wait for the website to be ready
window.onload = function () {

    // Get the data from jsonplaceholder
    axios.get("https://jsonplaceholder.typicode.com/users", {
        method: "get"
    })
        .then(response => {

            // Put the users in a variable
            const users = response.data;

            // Create a table
            const table = document.createElement("table");

            // Add all the titles to the table
            table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
            </tr>`;


            // For each user
            for (const user of users) {

                // Create the table row
                const row = document.createElement("tr");

                // Add the data to the row
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}</td>
                    <td>${user.phone}</td>
                    <td>${user.website}</td>`;

                // Add the row to the table
                table.appendChild(row);

            }

            // Add the table to the body
            document.body.appendChild(table);
        })
        .catch(err => console.log(err));

}