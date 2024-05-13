

export const creditHandler = (html) => {
    try {
        // Config REGEX to extract info
        // Extract the ammount
        // const importeRegex = /<b class="texto-negrita"><span>\$<\/span>\s*<span>([\d.,]+)<\/span><\/b>/;
        // const importeMatch = html.match(importeRegex);
        // let importe = null;
            
        // if (importeMatch) {
        //     // Deletes $ sign and keeps , as separator
        //     importe = parseFloat(importeMatch[1].replace(/\$|[^0-9,]/g, ''));
        // }

        // // Extract the date of the movment
        // const dateRegex = /<b class="texto-negrita"><span>(\d{2}\/\d{2}\/\d{4})<\/b>/;
        // const dateMatch = html.match(dateRegex);
        // const date = dateMatch ? dateMatch[1] : null;

        // // Extract the name of the shop
        // const establecimientoRegex = /<b class="texto-negrita"><span>([^<]+)<\/span><\/b>/;
        // const establecimientoMatch = html.match(establecimientoRegex);
        // const establecimiento = establecimientoMatch ? establecimientoMatch[1].trim() : null;

        // Extract the name of the shop
        const establecimientoRegex = /en el establecimiento\s+([^,]+)\s+por/i;
        const establecimientoMatch = html.match(establecimientoRegex);
        const establecimiento = establecimientoMatch ? establecimientoMatch[1].trim() : null;

        // Extract the ammount
        const importeRegex = /por \$\s*([\d.,]+)/;
        const importeMatch = html.match(importeRegex);
        const importe = importeMatch ? parseFloat(importeMatch[1].replace(',', '')) : null;

        // // Extract the date of the movment
        const dateRegex = /el (\d{1,2}\/\d{1,2}\/\d{2,4})/;
        const dateMatch = html.match(dateRegex);
        const date = dateMatch ? dateMatch[1] : null;

        if(importe && date && establecimiento) {
            const movement = {
                categoria: 'tarjeta de credito',
                importe: importe,
                fecha: date,
                destino: establecimiento
            }

            // console.log({movement});
            return movement
        }
    } catch (error) {
        console.log(`ERROR EN EXTRACIÓN DE INFO -> creditHandler`);
        return error.message;
    }
}

export const debitHandler = (html) => {
    try {
        const destinatarioRegex = /<td width="40%">\s*CBU vendedor\s*<br><br><\/td>\s*<td width="60%" align="right" style="font-weight: bold;">\s*([\s\S]*?)\s*<br><br>/;
        const destinatarioMatch = html.match(destinatarioRegex);
        const destinatario = destinatarioMatch ? destinatarioMatch[1].trim() : null;
        
        // Expresión regular para extraer el importe
        const importeRegex = /<td width="40%">\s*Importe\s*<br><br><\/td>\s*<td width="60%" align="right" style="font-weight: bold;">\s*ARS\s*([\d.,]+)\s*<br><br>/;
        const importeMatch = html.match(importeRegex);
        let importe = null;
        
        if (importeMatch) {
            // Deletes $ sign and keeps , as separator
            importe = parseFloat(importeMatch[1].replace(/\$|[^0-9,]/g, ''));
        }
        
        // Expresión regular para extraer la fecha y hora
        const fechaRegex = /<td width="60%" align="right" style="font-weight: bold;">\s*([\d/]+)\s*<br><br>/;
        const fechaMatch = html.match(fechaRegex);
        const fecha = fechaMatch ? fechaMatch[1].trim() : null;

        if (fecha && importe !== null && destinatario) {
            const debit = {
                categoria: 'debito en cuenta',
                fecha: fecha,
                importe: importe,
                destino: destinatario
            };

            return debit
        }
    } catch (error) {
        console.log(`ERROR EN EXTRACIÓN DE INFO -> debitHandler`);
        return error.message;
    }
}

export const transferHandler = (html) => {
    // console.log(html);
    try {
        const fechaRegex = /Fecha\s*<br><br><\/td>\s*<td.*?>(.*?)\s*<br><br><\/td>/;
        const fechaMatch = html.match(fechaRegex);
        const fecha = fechaMatch ? fechaMatch[1].trim() : null;

        // Expresión regular para extraer el importe
        const importeRegex = /Importe\s*<br><br><\/td>\s*<td.*?>.*?\s*([0-9,.]+)\s*<br><br><\/td>/;
        const importeMatch = html.match(importeRegex);
        let importe = null;
        if (importeMatch) {
            // Deletes $ sign and keeps , as separator
            importe = parseFloat(importeMatch[1].replace(/\$|[^0-9,]/g, ''));
        }

        // Expresión regular para extraer el destino (CVU o CUIT)
        const destinoRegex = /<td.*?>\s*(\d{22})\s*<br><br><\/td>/;
        const destinoMatch = html.match(destinoRegex);
        const destino = destinoMatch ? destinoMatch[1].trim() : null;

        if (fecha && importe !== null && destino) {
            const transfer = {
                categoria: 'transferencia desde banco',
                fecha: fecha,
                importe: importe,
                destino: destino
            };

            return transfer
        }
    } catch (error) {
        console.log(`ERROR EN EXTRACIÓN DE INFO -> transferHandler`);
        return error.message;
    }
}

export const bankTransferHandler = (html) => {
    try {        
        const destinatarioRegex = /<b>Destinatario<\/b><\/td>\s*<\/tr>\s*<tr>\s*<td[^>]*>(.*?)<\/td>/;
        const destinatarioMatch = html.match(destinatarioRegex);
        const destinatario = destinatarioMatch ? destinatarioMatch[1].trim() : null;
        
        // Expresión regular para extraer el importe
        const importeRegex = /<td><b>Importe<\/b><\/td>\s*<\/tr>\s*<tr>\s*<td[^>]*>\s*\$?\s*([0-9,.]+)<\/td>/;
        const importeMatch = html.match(importeRegex);
        let importe = null;
        
        if (importeMatch) {
            // Deletes $ sign and keeps , as separator
            importe = parseFloat(importeMatch[1].replace(/\$|[^0-9,]/g, ''));
        }
        
        // Expresión regular para extraer la fecha y hora
        const fechaHoraRegex = /<td><b>Fecha y hora<\/b><\/td>\s*<\/tr>\s*<tr>\s*<td[^>]*>(.*?)<\/td>/;
        const fechaHoraMatch = html.match(fechaHoraRegex);
        const fechaHora = fechaHoraMatch ? fechaHoraMatch[1].trim() : null;
        
        if (fechaHora && importe !== null && destinatario) {
            const transfer = {
                categoria: 'transferencia desde banco',
                fecha: fechaHora,
                importe: importe,
                destino: destinatario
            };
            return transfer;
        }
    } catch (error) {
        console.log(`ERROR EN EXTRACIÓN DE INFO -> bankTransferHandler`);
        return error.message;
    }
}

export const cardResumeHandler = (html) => {
    try {
        return console.log(`THIS IS FROM CARD RESUME EMAIL - IGNORED FOR NOW`);
    } catch (error) {
        console.log(`ERROR EN EXTRACIÓN DE INFO -> cardResumeHandler`);
        return error.message;
    }
}
