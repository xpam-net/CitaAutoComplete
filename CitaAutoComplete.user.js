// ==UserScript==
// @name         Cita AutoComplete
// @namespace    http://xpam.net/
// @version      0.3
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
    const provinciaFormURL = "/icpplustie/citar?locale=es"; // Barcelona
    const isPassport = true; // if "true" - using passport, instead of NIE
    const isDate = false; // if "true" - fill date field. It's possible to fill the date field with an empty value, but it's safer not to touch anything that is not required.

    // Constants
    const url = window.location.href;
    const firstPage = ['https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/acOpcDirect',
                       'https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/index.html',
                       'https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/index',
                       'https://sede.administracionespublicas.gob.es/icpplustie/index.html',
                       'https://sede.administracionespublicas.gob.es/icpplustie/index',
                       'https://sede.administracionespublicas.gob.es/icpplustie/']; // There are a lot of ways to get to the front page, so I'm listing everything I've got.

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
    if (firstPage.includes(url)) {
        var frm = document.getElementById('form');
        if (frm) {
            if (frm.nodeName == "SELECT") { // to make sure, that we change the select field
                frm.value=provinciaFormURL;
            }
        }
        clickElement('btnAceptar');
    }

    // Select procedure (second page)
    if (url == 'https://sede.administracionespublicas.gob.es/icpplustie/citar?locale=es') {
        setFieldValue('tramiteGrupo[1]', proceduralAction);
        clickElement('btnAceptar');
    }

    // Agreement of procedure (third page)
    if (url == 'https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/acInfo?p=8&tramite=4010') clickElement('btnEntrar');

    // Fill first form (fourth page)
    if (url == 'https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/acEntrada') {
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
    if (url == 'https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/acValidarEntrada') clickElement('btnEnviar');

    // Selection of the police department (sixth page)
    if (url == 'https://sede.administracionespublicas.gob.es/icpplustie/icpplustieb/acCitar') {
        // Always select default option, if you want to select department manually, comment next string
        clickElement('btnSiguiente'); // if Cita exists, proceed
        // If cita not exists
        var n = document.getElementById('btnSiguiente');
        if (n === null) {
            //alert('No cita');
            //clickElement('btnSalir'); // No cita, click "Salir"
        }
    }

    // Second form filling (seventh page)
    //if (url == '') {
    // ... insert form filling here ...

    // Phone number
    setFieldValue('txtTelefonoCitado', phoneNumber);
    // e-mail
    setFieldValue('emailUNO', eMail);
    setFieldValue('emailDOS', eMail);

    //clickElement('btnEnviar');
    //}


// <input id="btnEnviar" type="button" class="mf-button" value="Solicitar Cita" onclick="enviar('solicitud')" />

})();
