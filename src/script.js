
        $(document).ready(function () {
            // hopefully real zoom function
            $('p').each(function () {
                var text = $(this).text().split('');
                for (var i = 0, len = text.length; i < len; i = i + 1) {
                    text[i] = '<span>' + text[i] + '</span>';
                }
                $(this).html(text.join(' '));
            });

            const magnifier = $(".magnifier");

            // Tamaño del magnifier
            const magnifierSize = 50;
            const reactionRadius = 50;

            $(document).mousemove(function (event) {
                // Obtén las coordenadas del mouse ajustadas al desplazamiento de la página
                const mouseX = event.clientX + window.scrollX;
                const mouseY = event.clientY + window.scrollY;

                // Actualiza la posición del magnifier para seguir al mouse
                magnifier.css({
                    left: mouseX - magnifierSize / 2 + "px",
                    top: mouseY - magnifierSize / 2 + "px"
                });

                // Itera sobre las letras y aplica el efecto solo a las que están dentro del rango
                $('p span').each(function () {
                    const spanRect = this.getBoundingClientRect();
                    const spanX = spanRect.left + spanRect.width / 2;
                    const spanY = spanRect.top + spanRect.height / 2; 
                    const distance = Math.sqrt(Math.pow(spanX - mouseX, 2)-40 + Math.pow(spanY - mouseY, 2)-40);

                    if (distance < reactionRadius) {
                        $(this).find('::before').css('background-color', 'yellow');
                        $(this).css('-webkit-transform', 'scale(2.0)');
                    } else {
                        $(this).find('::before').css('background-color', 'transparent');
                        $(this).css('-webkit-transform', 'scale(1)');
                    }
                });
            });
        });