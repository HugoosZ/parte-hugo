
// control by keyword
// Asegura que el código se ejecute después de que el DOM se haya cargado completamente

document.addEventListener("DOMContentLoaded", function () {
    // Variable para rastrear el estado del switch
    let switchActivated = true;

    // Función para activar/desactivar la funcionalidad
    function toggleFunctionality() {
        // Obtiene todos los elementos con ID que comienza con "tab-"
        const tabs = document.querySelectorAll('[id^="tab"]');

        // Verifica el estado del switch y ajusta la funcionalidad en consecuencia
        if (switchActivated) {
            // Desactiva la funcionalidad eliminando el atributo tabindex
            tabs.forEach(tab => tab.removeAttribute("tabindex"));
        } else {
            // Activa la funcionalidad estableciendo el atributo tabindex a "0"
            tabs.forEach(tab => tab.setAttribute("tabindex", "0"));
        }

        // Cambia el estado del switch
        switchActivated = !switchActivated;
    }

    // Añade un evento de clic al botón con ID "tab-toggleSwitch"
    const toggleSwitchButton = document.getElementById("tab-toggleSwitch");
    toggleSwitchButton.addEventListener("click", toggleFunctionality);

    // Añade un evento de tecla para manejar las flechas arriba/abajo
    document.addEventListener("keydown", function (event) {
        // Verifica si la tecla presionada es ArrowDown o ArrowUp y si el switch está activado
        if ((event.key === "ArrowDown" || event.key === "ArrowUp") && switchActivated) {
            // Encuentra todos los elementos con ID que comienza con "tab-"
            const tabs = document.querySelectorAll('[id^="tab"]');
            
            // Encuentra el índice del elemento activo
            const currentIndex = Array.from(tabs).findIndex(tab => tab === document.activeElement);

            // Calcula el nuevo índice basado en la tecla presionada
            let newIndex;
            if (event.key === "ArrowDown") {
                newIndex = (currentIndex + 1) % tabs.length;
            } else {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }

            // Obtiene el elemento correspondiente al nuevo índice y lo enfoca
            const newTab = tabs[newIndex];
            
            // Asegura que el nuevo div pueda recibir el foco
            newTab.setAttribute("tabindex", "0");
            
            // Enfoca el nuevo div
            newTab.focus();

            // Agrega una clase de transición
            newTab.classList.add("transition-class");

            // Elimina la clase después de un pequeño retraso (300ms)
            setTimeout(() => {
                newTab.classList.remove("transition-class");
            }, 2000);
        }
    });
});
