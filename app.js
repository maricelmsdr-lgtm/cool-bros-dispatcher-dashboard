// ===============================
// COOL BROS DISPATCH APP
// ===============================

async function loadCustomers() {
    const tbody = document.getElementById("customersTableBody");

    if (!tbody) return;

    tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

    const { data, error } = await db
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        tbody.innerHTML = "<tr><td colspan='6'>Error loading customers.</td></tr>";
        return;
    }

    tbody.innerHTML = "";

    data.forEach(customer => {

        tbody.innerHTML += `
            <tr>
                <td>${customer.first_name}</td>
                <td>${customer.last_name}</td>
                <td>${customer.phone || ""}</td>
                <td>${customer.email || ""}</td>
                <td>${customer.city || ""}</td>

                <td>

                    <button onclick="editCustomer('${customer.id}')">
                        Edit
                    </button>

                    <button onclick="deleteCustomer('${customer.id}')">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}

async function saveCustomer() {

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const notes = document.getElementById("notes").value;

    const { error } = await db
        .from("customers")
        .insert([{
            first_name,
            last_name,
            phone,
            email,
            address,
            city,
            notes
        }]);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Customer saved!");

    document.getElementById("customerForm").reset();

    loadCustomers();

}

async function deleteCustomer(id){

    if(!confirm("Delete this customer?"))
        return;

    await db
        .from("customers")
        .delete()
        .eq("id", id);

    loadCustomers();

}

async function editCustomer(id){

    alert("Edit screen coming next.");

}

document.addEventListener("DOMContentLoaded", () => {

    loadCustomers();

});