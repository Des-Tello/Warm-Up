const btn_modo = document.querySelector('.btn-modo');
btn_modo.addEventListener('click', function(evento) {
    const body = document.querySelector('.body');
    const main = document.querySelector('.main');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const icon_mode_i = document.getElementById("btn_modoID");

    if ( body.className.match(/(?:^|\s)oscuro(?!\S)/) ) {
        body.className =body.className.replace( /(?:^|\s)oscuro(?!\S)/g , '' )
        main.className =main.className.replace( /(?:^|\s)oscuro_main(?!\S)/g , '' )
        header.className =header.className.replace( /(?:^|\s)oscuro_header(?!\S)/g , '' )
        footer.className =footer.className.replace( /(?:^|\s)oscuro_footer(?!\S)/g , '' )
        icon_mode_i.className = 'fas fa-lightbulb';
    }
    else {
        body.className += ' oscuro';
        main.className += ' oscuro_main';
        header.className += ' oscuro_header';
        footer.className += ' oscuro_footer';
        icon_mode_i.className = 'far fa-lightbulb';
    }
});