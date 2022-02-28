
        const form = document.getElementById("formFormulario");
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 
            let formFormularioData = new FormData(form);
            let formFormularioObj = convertFormFormularioData(formFormularioData);
            saveFormFormularioObj(formFormularioObj)
            insertTableRow(formFormularioObj);
            form.reset();
            //let formTableRef = document.getElementById("formTable");
            // let newTableRow = formTableRef.insertRow(-1);

            // let newTableCell = newTableRow.insertCell(0);
            // newTableCell.textContent = formFormularioData.get("nombre");
            
            // newTableCell = newTableRow.insertCell(1);
            // newTableCell.textContent = formFormularioData.get("raza");  

            // newTableCell = newTableRow.insertCell(2);
            // newTableCell.textContent = formFormularioData.get("color"); 

            // newTableCell = newTableRow.insertCell(3);
            // newTableCell.textContent = formFormularioData.get("edad"); 
        })

        document.addEventListener("DOMContentLoaded", function(event) {
            drawCategory()
            let transactionObjArray = JSON.parse(localStorage.getItem("fromData"))
            transactionObjArray.forEach(
                function(arrayElement) {
                    insertTableRow(arrayElement)
                }
            )              
                     
        });

        function drawCategory() {
            let allCategories = ["bulldog", "dog", "bulling", "chiguagua"]
            for (let index = 0; index < allCategories.length; index++) {
                insertCategory(allCategories[index]);
                
            }
        }

        function insertCategory(categoryName) {
            const selectElement = document.getElementById("raza")
            let htmlToInsert = `<option> ${categoryName} </option>`
            selectElement.insertAdjacentHTML("beforeend", htmlToInsert) 
        }

        function getNewTransactionId() {
                let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
                let newTransactionId = JSON.parse(lastTransactionId) + 1;
                localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
                return newTransactionId;
            }

        function convertFormFormularioData(formFormularioData) {
            let nombre = formFormularioData.get("nombre");
            let raza = formFormularioData.get("raza");
            let color = formFormularioData.get("color");
            let edad = formFormularioData.get("edad");
            let transactionId = getNewTransactionId();
            return{"nombre": nombre, "raza": raza, "color": color, "edad": edad, "transactionId": transactionId}
        }

        // Es lo mismo que lo anterior pero más limpio en una función
        function insertTableRow(formFormularioObj) {
            let formTableRef = document.getElementById("formTable");
            let newTableRow = formTableRef.insertRow(-1);
            newTableRow.setAttribute("data-transaction-Id", formFormularioObj["transactionId"])

            let newTableCell = newTableRow.insertCell(0);
            newTableCell.textContent = formFormularioObj["nombre"];

            newTableCell = newTableRow.insertCell(1);   
            newTableCell.textContent = formFormularioObj["raza"];  

            newTableCell = newTableRow.insertCell(2);
            newTableCell.textContent = formFormularioObj["color"]; 

            newTableCell = newTableRow.insertCell(3);
            newTableCell.textContent = formFormularioObj["edad"]; 

            let newDeleteCell = newTableRow.insertCell(4);
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            newDeleteCell.appendChild(deleteButton);

            deleteButton.addEventListener("click", (event) => {
                let transactionRow = event.target.parentNode.parentNode;
                let transactionId = transactionRow.getAttribute("data-transaction-Id")         
                transactionRow.remove();
                deleteTransactionObj(transactionId);
            })
        }

        //Para pasarle el transactionId de la transaccion que quiero eliminar
        function deleteTransactionObj(transactionId) {
            //Obtengo las transacciones de mi base de datos (desconvierto de JSON a objeto)
            let transactionObjArray = JSON.parse(localStorage.getItem("fromData"))
            //Busco el indice de la transaccion que quiero eliminar
            let transactionIndexArray = transactionObjArray.findIndex(element => element.transactionId === transactionId)
            //Elimino el elemento de la transaccion seleccionada
            transactionObjArray.splice(transactionIndexArray, 1)
            //Convierto nuevamente a formato JSON
            let transactionArrayjJSON = JSON.stringify(transactionObjArray);
            //Guardo mi array de Transacciones en formato JSON en el localStarage
            localStorage.setItem("fromData", transactionArrayjJSON);
        }

        function saveFormFormularioObj(formFormularioObj) {
            let myTransactionArray = JSON.parse(localStorage.getItem("fromData")) || [];
            myTransactionArray.push(formFormularioObj);
            //Convierto mi array de transacciones a .JSON
            let transactionArrayjJSON = JSON.stringify(myTransactionArray);
            //Guardo mi array de Transacciones en formato JSON en localStarage
            localStorage.setItem("fromData", transactionArrayjJSON);
        }
        