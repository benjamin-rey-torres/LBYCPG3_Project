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
part_select.addEventListener('change',update_parts);

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
}
