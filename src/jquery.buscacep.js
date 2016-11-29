/**
 * Objeto responsável pala consulta de ceps na API http://api.postmon.com.br/v1/cep.
 * @param {Object} options Opções de configuração para aconsulta
 * @returns {undefined}
 */
$.fn.buscacep = function (options) {
    /*{"bairro": "Guararapes", "cidade": "Jaboat\u00e3o dos Guararapes", "cep": "54315390", "logradouro": "Rua Dom Expedito Lopes (Com.Garapeira)", "estado_info": {"area_km2": "98.076,109", "codigo_ibge": "26", "nome": "Pernambuco"}, "cidade_info": {"area_km2": "258,694", "codigo_ibge": "2607901"}, "estado": "PE"}*/
    /**
     * 
     * @type Boolean VAriável que impede a execução de multiplas consultas simultaneas para o mesmo componente.
     */
    var buscando = false;
    /**/
    $(this).keyup(function () {
        var cep = $(this).val().replace(/[^\d]+/g, '');
        var api = "https://api.postmon.com.br/v1/cep/";
        var pai = $(this).closest(".buscacep-container");
        if (cep.length === 8 && !buscando) {
            buscando = false;
            /* Realizando a busca */
            $.getJSON(api + cep).done(function (resposta) {
                if (
                        typeof (resposta) === "object" &&
                        Object.keys(resposta).length > 0
                        ) {
                    /* A resposta é válida, preenche os dados */
                    pai.find(".buscacep-logradouro").val(resposta.logradouro);
                    pai.find(".buscacep-bairro").val(resposta.bairro);
                    pai.find(".buscacep-cidade").val(resposta.cidade);
                    pai.find(".buscacep-estado").val(resposta.estado);
                }
                buscando = false;
            }).fail(function () {
                buscando = false;
            });
        }
    });
};