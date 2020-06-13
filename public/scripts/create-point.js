//
function popularUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then(states =>{

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        
        }
    
    })
}
popularUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfselectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfselectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = false

    fetch(url)
    .then(res=> res.json())
    .then(cities =>{
            for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        
        }
    citySelect.disabled = false
    })

}


document.querySelector("select[name=uf]")
.addEventListener("change",getCities)

//itens de coleta
//todos li's
const itensToCollect = document.querySelectorAll(".itens-grid  li")
for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens =  document.querySelector("input[name=Itens]")

let selectedItens=[]

function handleSelectedItem(event){
const itemLi = event.target

    //add ou rmv classe
itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    
    const alreadySelected = selectedItens.findIndex(item=>{
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItens = selectedItens.filter(item=>{
            const ItemIsDiferent = item != itemId
            return false
        })
        selectedItens = filteredItens
    } else{
        selectedItens.push(itemId)
    }
   collectedItens.value = selectedItens
   console.log(selectedItens)
}