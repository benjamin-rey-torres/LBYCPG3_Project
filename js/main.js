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
    {
      name: "i5-6600",
      type: "CPU",
      value: "50"
    },
    {
      name: "i7-6600",
      type: "CPU",
      value: "60"
    },
    {
      name: "corsair-ddr4",
      type: "RAM",
      value: "16"
    },
    {
      name: "ripjaws",
      type: "RAM",
      value: "32"
    },
    {
      name: "GTX 3070",
      type: "GPU",
      value: "16"
    },
    {
      name: "Radeon 7700 XT",
      type: "GPU",
      value: "32"
    }
  ]

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
