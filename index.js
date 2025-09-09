
const categoryContainer = document.getElementById('categoryContainer')
const plantContainer = document.getElementById('plantContainer')
const modalContainer = document.getElementById('modal-details')



const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res=> res.json())
    .then(data => {
        const categories = data.categories
        // console.log(categories)
        showCategory(categories)
    })
}

const showCategory = (categories) => {

    categories.forEach(category =>{
        
        categoryContainer.innerHTML += `
          <li onclick= "loadPlantCategoryById(${category.id})"  id="${category.id}" class="font-semibold  p-3 hover:bg-green-500">${category.category_name}</li>
        `
    })

    categoryContainer.addEventListener('click',(e) =>{
        console.log(e.target)

        const AllLi = document.querySelectorAll('li')
        AllLi.forEach(li =>{
            li.classList.remove('bg-green-400')

        })


        if(e.target.localName === 'li'){
            // console.log(e.target)
            e.target.classList.add('bg-green-400')
        }
    })

}

const loadPlantCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res=> res.json())
    .then(data => {
        showPlantCategory(data.plants)
        // console.log(data)
    })
}

const loadPlantCategoryById = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        showPlantCategory(data.plants)
    })
}

const loadModalDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res=> res.json())
    .then(data => {
        displayModalBox(data.plants)
        console.log(data.plants)
    })
}

const displayModalBox = (plant) => {
    modalContainer.innerHTML = `
    <h2 class="text-2xl font-semibold mb-2.5 ">${plant.name}</h2>
             <figure>
                <img
                  src="${plant.image}"
                  alt="tree picture"
                  class="max-h-full max-w-full"
                />
              </figure>

              <div class="card-actions flex  items-center">
                  <div class="btn btn-soft btn-success text-[#15803D] bg-[#DCFCE7] rounded-full text-sm font-medium p-1.5">${plant.category}</div>
                  <div class="">৳${plant.price}</div>
                </div>

                <p class="text-xs font-normal">
                  ${plant.description}
                </p>
    `
    document.getElementById('plant_modal').showModal()

}

const showPlantCategory = (plants) => {
    
    plantContainer.innerHTML = ''

    console.log(plants)

    plants.forEach(plant => {

        plantContainer.innerHTML += `
        <div class="card bg-base-100 shadow-sm p-4 h-full">
              <figure>
                <img
                  src="${plant.image}"
                  alt="tree picture"
                  class="max-h-full max-w-full"
                />
              </figure>
              <div class="card-body p-0 mt-4">
                <h2 onclick="loadModalDetails(${plant.id})" class="text-sm font-semibold">${plant.name}</h2>
                <p class="text-xs font-normal">
                  ${plant.description}
                </p>
                <div class="card-actions flex  items-center">
                  <div class="btn btn-soft btn-success text-[#15803D] bg-[#DCFCE7] rounded-full text-sm font-medium p-1.5">${plant.category}</div>
                  <div class="">৳${plant.price}</div>
                </div>
                <div class="btn rounded-full bg-[#15803D] text-white">Add to Cart</div>
              </div>
        `
    })

}



loadCategory()
loadPlantCategory()