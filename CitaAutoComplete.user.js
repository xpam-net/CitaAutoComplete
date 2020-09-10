// ==UserScript==
// @name         Cita AutoComplete
// @namespace    http://xpam.net/
// @version      0.5
// @description  AutoComplete of the cita form
// @author       Andrey Luzhin
// @include      https://sede.administracionespublicas.gob.es/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    // Configuration
    const fullName = "John Smith";
    const documentID = "000000000";
    const documentDate = "01/01/2020";
    const phoneNumber = "000000000";
    const eMail = "none@none.com";
    const countryCode = "149"; // Rusia
    const proceduralAction = "4010"; // POLICIA-TOMA DE HUELLAS (EXPEDICIÓN DE TARJETA) Y RENOVACIÓN DE TARJETA DE LARGA DURACIÓN
    const provinciaFormURL = "/icpplustie/citar?p=8&locale=es"; // Barcelona
    const isPassport = true; // if "true" - using passport, instead of NIE
    const isDate = false; // if "true" - fill date field. It's possible to fill the date field with an empty value, but it's safer not to touch anything that is not required.

    // Constants
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const firstPage = ['/icpplustie/icpplustieb/acOpcDirect',
                       '/icpplustie/icpplustieb/index.html',
                       '/icpplustie/icpplustieb/index',
                       '/icpplustieb/acOpcDirect',
                       '/icpplustieb/index.html',
                       '/icpplustieb/index',
                       '/icpplustieb/',
                       '/icpplustie/acOpcDirect',
                       '/icpplustie/index.html',
                       '/icpplustie/index',
                       '/icpplustie/']; // There are a lot of ways to get to the front page, so I'm listing everything I've got.

    // Field value setting function. Check for element existance
    function setFieldValue(f, v) {
        var e = document.getElementById(f);
        if (e) e.value=v;
    }

    // Autoclick element function. Check for element existance
    function clickElement(e) {
        var ac = document.getElementById(e);
        if (ac) ac.click();
    }

    // Select Barcelona on the front page
    if (firstPage.includes(path)) {
        var frm = document.getElementById('form');
        if (frm) {
            if (frm.nodeName == "SELECT") { // to make sure, that we change the select field
                frm.value=provinciaFormURL; // quick but dirty
                if (frm.options[frm.selectedIndex].text != 'Barcelona') alert('Something wrong!'); // quick check for form change
            }
        }
        /* // If they will change select url again, should use something like this:
        var formProvince = document.getElementById('form');
        if (formProvince) {
            if (formProvince.nodeName == "SELECT") { // to make sure, that we change the select field
                for (i = 0; i < formProvince.length; i++) {
                    if (formProvince.options[i].text == 'Barcelona') {
                        formProvince.options[i].selected = true;
                        break;
                    }
                }
            }
        }
        */
        clickElement('btnAceptar');
    }

    // Select procedure (second page)
    if (page == 'citar') {
        setFieldValue('tramiteGrupo[1]', proceduralAction);
        /* // more accurate, but have disadvantages
        var formProcedure = document.getElementById('tramiteGrupo[1]');
        if (formProcedure) {
            for (i = 0; i < formProcedure.length; i++) {
                if (formProcedure.options[i].text == 'POLICIA-TOMA DE HUELLAS (EXPEDICIÓN DE TARJETA) Y RENOVACIÓN DE TARJETA DE LARGA DURACIÓN') {
                    formProcedure.options[i].selected = true;
                    break;
                }
            }
        }
        */
        clickElement('btnAceptar');
    }

    // Agreement of procedure (third page)
    if (page == 'acInfo') {
        clickElement('btnEntrar');
        // they changed moment of notification, about absence of citas
        var bte = document.getElementById('btnEntrar');
        if (bte === null) { // NB: if they change id of "Entrar" button, this script will stop working properly
            //alert('No cita');
            //clickElement('btnVolver'); // No cita, click "Volver"
        }
    }

    // Fill first form (fourth page)
    if (page == 'acEntrada') {
        // If document type is passport, selecting right radio button
        if (isPassport) clickElement('rdbTipoDocPas');
        // Document Number. One field for both NIE and passport
        setFieldValue('txtIdCitado', documentID);
        // Name and surname, in upper case
        setFieldValue('txtDesCitado', fullName.toUpperCase());
        // Date
        if (isDate) setFieldValue('txtFecha', documentDate);
        // Country selection
        setFieldValue('txtPaisNac', countryCode);
        // clickElement(, 'btnAceptar'); // ReCaptcha, no autoclick possible at this time
    }

    // Click "Solicitar Cita" (fifth page)
    if (page == 'acValidarEntrada') clickElement('btnEnviar');

    // Selection of the police department (sixth page)
    if (page == 'acCitar') {
        // Always select default option, if you want to select department manually, comment next string
        clickElement('btnSiguiente'); // if Cita exists, proceed
        // If cita not exists
        var bts = document.getElementById('btnSiguiente');
        if (bts === null) { // NB: if they change id of "Siguiente" button, this script will stop working properly
            //Uncomment next string for autorepeat if no cita exists
            //clickElement('btnSalir'); // No cita, click "Salir"
        }
    }

    // Second form filling (seventh page)
    if (page == 'acVerFormulario') {
        // Phone number
        setFieldValue('txtTelefonoCitado', phoneNumber);
        // e-mail
        setFieldValue('emailUNO', eMail);
        setFieldValue('emailDOS', eMail);

        clickElement('btnSiguiente');
    }

})();
