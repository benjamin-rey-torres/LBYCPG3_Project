// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

//import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

//
// Place any custom JS here
//

// Create an example popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const part_select = document.getElementById("part-select-type");
const available_parts = document.getElementById("parts");

if (part_select && available_parts) {
    part_select.addEventListener('change', update_parts);
}

const parts = [

        // CPU
        { name: "Ryzen 5 5600", type: "CPU", price: 6800, specs: { cores: 6, threads: 12, base_clock: "3.5GHz" }},
        { name: "Intel i5-12400F", type: "CPU", price: 6700, specs: { cores: 6, threads: 12, base_clock: "2.5GHz" }},
        { name: "Ryzen 7 5800X", type: "CPU", price: 11000, specs: { cores: 8, threads: 16, base_clock: "3.8GHz" }},
        { name: "Intel i7-12700K", type: "CPU", price: 19800, specs: { cores: 12, threads: 20, base_clock: "3.6GHz" }},

        // RAM
        { name: "Corsair Vengeance 16GB", type: "RAM", price: 5500, specs: { capacity: "16GB", speed: "3200MHz", memory_type: "DDR4" }},
        { name: "G.Skill Ripjaws 16GB", type: "RAM", price: 6000, specs: { capacity: "16GB", speed: "3600MHz", memory_type: "DDR4" }},
        { name: "Corsair Dominator 32GB", type: "RAM", price: 10000, specs: { capacity: "32GB", speed: "5200MHz", memory_type: "DDR5" }},
        { name: "G.Skill Trident Z5 32GB", type: "RAM", price: 11000, specs: { capacity: "32GB", speed: "6000MHz", memory_type: "DDR5" }},

        // GPU
        { name: "RTX 3060", type: "GPU", price: 21000, specs: { vram: "12GB", memory_type: "GDDR6", bus: "192-bit" }},
        { name: "RX 6600 XT", type: "GPU", price: 15500, specs: { vram: "8GB", memory_type: "GDDR6", bus: "128-bit" }},
        { name: "RTX 4070 Super", type: "GPU", price: 36000, specs: { vram: "12GB", memory_type: "GDDR6X", bus: "192-bit" }},
        { name: "RX 7800 XT", type: "GPU", price: 31000, specs: { vram: "16GB", memory_type: "GDDR6", bus: "256-bit" }},

        // STORAGE
        { name: "Kingston 500GB NVMe", type: "STORAGE", price: 2500, specs: { capacity: "500GB", interface: "NVMe", generation: "PCIe 4.0" }},
        { name: "Samsung 980 1TB", type: "STORAGE", price: 5000, specs: { capacity: "1TB", interface: "NVMe", generation: "PCIe 3.0" }},
        { name: "Samsung 990 Pro 1TB", type: "STORAGE", price: 11000, specs: { capacity: "1TB", interface: "NVMe", generation: "PCIe 4.0" }},
        { name: "WD Black SN850X 1TB", type: "STORAGE", price: 6700, specs: { capacity: "1TB", interface: "NVMe", generation: "PCIe 4.0" }},

        // MOTHERBOARD
        { name: "MSI B450 Tomahawk", type: "MOTHERBOARD", price: 5700, specs: { socket: "AM4", chipset: "B450", form_factor: "ATX" }},
        { name: "ASUS Prime B660M-A", type: "MOTHERBOARD", price: 8400, specs: { socket: "LGA1700", chipset: "B660", form_factor: "mATX" }},
        { name: "ASUS ROG Strix X570-E", type: "MOTHERBOARD", price: 18000, specs: { socket: "AM4", chipset: "X570", form_factor: "ATX" }},
        { name: "MSI MPG Z790 Carbon", type: "MOTHERBOARD", price: 27000, specs: { socket: "LGA1700", chipset: "Z790", form_factor: "ATX" }},

        // PSU
        { name: "Corsair CV550", type: "PSU", price: 3300, specs: { wattage: "550W", efficiency: "80+ Bronze", modular: "Non-Modular" }},
        { name: "EVGA 600 BR", type: "PSU", price: 3000, specs: { wattage: "600W", efficiency: "80+ Bronze", modular: "Non-Modular" }},
        { name: "Corsair RM850x", type: "PSU", price: 8100, specs: { wattage: "850W", efficiency: "80+ Gold", modular: "Fully Modular" }},
        { name: "Seasonic GX-850", type: "PSU", price: 6800, specs: { wattage: "850W", efficiency: "80+ Gold", modular: "Fully Modular" }},

        // CASE
        { name: "NZXT H510", type: "CASE", price: 4400, specs: { size: "Mid Tower", airflow: "Standard", panel: "Tempered Glass" }},
        { name: "Phanteks P300A", type: "CASE", price: 3100, specs: { size: "Mid Tower", airflow: "High Airflow Mesh", panel: "Mesh Front" }},
        { name: "Lian Li O11 Dynamic", type: "CASE", price: 4650, specs: { size: "Mid Tower", airflow: "Moderate", panel: "Dual Glass" }},
        { name: "Fractal Meshify 2", type: "CASE", price: 8000, specs: { size: "Mid Tower", airflow: "High Airflow Mesh", panel: "Tempered Glass" }},

        // COOLER 
        { name: "Cooler Master Hyper 212", type: "COOLER", price: 2000, specs: { cooling_type: "Air", size: "120mm", performance: "Mid" }},
        { name: "Deepcool AK400", type: "COOLER", price: 2200, specs: { cooling_type: "Air", size: "120mm", performance: "Mid" }},
        { name: "Noctua NH-D15", type: "COOLER", price: 7000, specs: { cooling_type: "Air", size: "Dual 140mm", performance: "High" }},
        { name: "Corsair H100i", type: "COOLER", price: 6000, specs: { cooling_type: "Liquid", size: "240mm", performance: "High" }}
    ];

function update_parts() {
    const chosen_part_type = part_select.value;

    available_parts.innerHTML = '';

    parts.forEach(part => {
        if (part.type === chosen_part_type) {
            const option = document.createElement('option');
            const specString = Object.values(part.specs).join(' • ');
            option.value = part.name;
            option.textContent = `${part.name} (${specString}) - ₱${part.price.toLocaleString()}`;
            available_parts.appendChild(option);
        }
    });

    if (chosen_part_type === "default") {
        if (part_name) part_name.innerHTML = "";
        if (part_type) part_type.innerHTML = "";
        if (price) price.innerHTML = "";
        if (spec1_name) spec1_name.innerHTML = "";
        if (spec2_name) spec2_name.innerHTML = "";
        if (spec3_name) spec3_name.innerHTML = "";
        if (spec1_value) spec1_value.innerHTML = "";
        if (spec2_value) spec2_value.innerHTML = "";
        if (spec3_value) spec3_value.innerHTML = "";
    }
    else {
        show_info();
    }
}

if (available_parts) {
    available_parts.addEventListener('change', show_info);
}

const part_name = document.getElementById("part_name");
const part_type = document.getElementById("part_type");
const price = document.getElementById("price");
const spec1_name = document.getElementById("spec1_name");
const spec2_name = document.getElementById("spec2_name");
const spec3_name = document.getElementById("spec3_name");
const spec1_value = document.getElementById("spec1_value");
const spec2_value = document.getElementById("spec2_value");
const spec3_value = document.getElementById("spec3_value");

function show_info() {
    const chosen_part = available_parts.value;
    const part_object = parts.find((element) => element.name === chosen_part);

    if (!part_object) return;

    part_name.innerHTML = chosen_part;
    part_type.innerHTML = part_object.type;
    price.innerHTML = "₱" + part_object.price.toLocaleString();

    const spec_keys = Object.keys(part_object.specs);
    const spec_values = Object.values(part_object.specs);

    spec1_name.innerHTML = formatSpec(spec_keys[0] || "");
    spec2_name.innerHTML = formatSpec(spec_keys[1] || "");
    spec3_name.innerHTML = formatSpec(spec_keys[2] || "");

    spec1_value.innerHTML = spec_values[0] || "";
    spec2_value.innerHTML = spec_values[1] || "";
    spec3_value.innerHTML = spec_values[2] || "";
}

function formatSpec(key) {
    return key.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


// PART COMPARE LOGIC

const compareContainer = document.getElementById("compare-container");
const compareRows = document.querySelectorAll("#PartSelector tbody tr, tbody tr");

document.querySelectorAll(".part-type").forEach(select => {
    populateTypes(select);

    select.addEventListener("change", function () {
        const row = this.closest("tr");
        const modelSelect = row.querySelector(".part-model");

        populateModels(modelSelect, this.value);
        updateCompare();
    });
});

function populateTypes(select) {
    const types = [...new Set(parts.map(p => p.type))];
    select.innerHTML = '<option value="">Select Type</option>';

    types.forEach(type => {
        const opt = document.createElement("option");
        opt.value = type;
        opt.textContent = type;
        select.appendChild(opt);
    });
}

function populateModels(select, type) {
    if (!select) return;

    select.innerHTML = '<option value="">Select Model</option>';

    const filtered = parts.filter(p => p.type === type);

    filtered.forEach(part => {
        const opt = document.createElement("option");
        opt.value = part.name;
        opt.textContent = part.name;
        select.appendChild(opt);
    });
}

document.addEventListener("change", function (e) {
    if (
        e.target.classList.contains("compare-check") ||
        e.target.classList.contains("part-model") ||
        e.target.classList.contains("part-type")
    ) {
        updateCompare();
    }
});

function updateCompare() {
    if (!compareContainer) return;

    compareContainer.innerHTML = "";

    const rows = document.querySelectorAll("tbody tr");
    let selectedParts = [];

    rows.forEach(row => {
        const checkbox = row.querySelector(".compare-check");
        const modelSelect = row.querySelector(".part-model");

        if (!checkbox || !modelSelect) return;

        const checked = checkbox.checked;
        const model = modelSelect.value;

        if (checked && model) {
            const part = parts.find(p => p.name === model);
            if (part) {
                selectedParts.push(part);
            }
        }
    });

    selectedParts.slice(0, 3).forEach(part => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        const specKeys = Object.keys(part.specs);
        const specValues = Object.values(part.specs);

        col.innerHTML = `
            <img
                src="placeholder.png"
                class="d-block mx-auto img-fluid mb-3"
                alt="${part.name}"
                loading="lazy"
                width="300"
                height="300"
            />
            <h4 class="fw-bold">${part.name}</h4>
            <hr>
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Type</th>
                        <td>${part.type}</td>
                    </tr>
                    <tr>
                        <th scope="row">Price</th>
                        <td>₱${part.price.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th scope="row">${formatSpec(specKeys[0] || "")}</th>
                        <td>${specValues[0] || ""}</td>
                    </tr>
                    <tr>
                        <th scope="row">${formatSpec(specKeys[1] || "")}</th>
                        <td>${specValues[1] || ""}</td>
                    </tr>
                    <tr>
                        <th scope="row">${formatSpec(specKeys[2] || "")}</th>
                        <td>${specValues[2] || ""}</td>
                    </tr>
                </tbody>
            </table>
        `;

        compareContainer.appendChild(col);
    });
}