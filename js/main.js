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
    { name: "Ryzen 5 5600", type: "CPU", value: "150" },
    { name: "Intel i5-12400F", type: "CPU", value: "160" },
    { name: "Ryzen 7 5800X", type: "CPU", value: "300" },
    { name: "Intel i7-12700K", type: "CPU", value: "320" },

    // RAM
    { name: "Corsair Vengeance 16GB DDR4", type: "RAM", value: "70" },
    { name: "G.Skill Ripjaws 16GB DDR4", type: "RAM", value: "75" },
    { name: "Corsair Dominator 32GB DDR5", type: "RAM", value: "180" },
    { name: "G.Skill Trident Z5 32GB DDR5", type: "RAM", value: "190" },

    // GPU
    { name: "RTX 3060", type: "GPU", value: "300" },
    { name: "RX 6600 XT", type: "GPU", value: "280" },
    { name: "RTX 4070 Super", type: "GPU", value: "600" },
    { name: "RX 7800 XT", type: "GPU", value: "580" },

    // STORAGE
    { name: "Kingston 500GB NVMe", type: "STORAGE", value: "50" },
    { name: "Samsung 980 1TB NVMe", type: "STORAGE", value: "90" },
    { name: "Samsung 990 Pro 1TB", type: "STORAGE", value: "150" },
    { name: "WD Black SN850X 1TB", type: "STORAGE", value: "160" },

    // MOTHERBOARD
    { name: "MSI B450 Tomahawk", type: "MOTHERBOARD", value: "120" },
    { name: "ASUS Prime B660M-A", type: "MOTHERBOARD", value: "130" },
    { name: "ASUS ROG Strix X570-E", type: "MOTHERBOARD", value: "300" },
    { name: "MSI MPG Z790 Carbon", type: "MOTHERBOARD", value: "320" },

    // PSU
    { name: "Corsair CV550 550W", type: "PSU", value: "60" },
    { name: "EVGA 600 BR 600W", type: "PSU", value: "65" },
    { name: "Corsair RM850x 850W Gold", type: "PSU", value: "150" },
    { name: "Seasonic Focus GX-850", type: "PSU", value: "160" },

    // CASE
    { name: "NZXT H510", type: "CASE", value: "80" },
    { name: "Phanteks P300A", type: "CASE", value: "75" },
    { name: "Lian Li O11 Dynamic", type: "CASE", value: "150" },
    { name: "Fractal Meshify 2", type: "CASE", value: "160" },

    // COOLER
    { name: "Cooler Master Hyper 212", type: "COOLER", value: "40" },
    { name: "Deepcool AK400", type: "COOLER", value: "45" },
    { name: "Noctua NH-D15", type: "COOLER", value: "100" },
    { name: "Corsair H100i Liquid", type: "COOLER", value: "140" }
  ];

function update_parts() {
    const chosen_part_type = part_select.value;

    available_parts.innerHTML = '';

    console.log(chosen_part_type)

    parts.forEach(part => {
        if(part.type === chosen_part_type){
            const option = document.createElement('option');
            option.value = part.name;
            option.textContent = part.name;
            available_parts.appendChild(option);
        }
    })


}
