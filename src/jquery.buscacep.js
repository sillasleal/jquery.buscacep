/* 
 * Copyright (C) 2016 Sillas S. Leal<sillas.s.leal@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Objeto responsável pala consulta de ceps na API http://api.postmon.com.br/v1/cep.
 * @param {Object} config Opções de configuração para aconsulta
 * @returns {undefined}
 */
$.fn.buscacep = function (config) {
    
    /**
     * 
     * @type String URL da API responsável pela busca
     */
    var api = "https://api.postmon.com.br/v1/cep/";

    /**
     * 
     * @type Boolean VAriável que impede a execução de multiplas consultas simultaneas para o mesmo componente.
     */
    var buscando = false;

    /**
     * 
     * @type {object} O component referente ao cep
     */
    var seletor = $(this);

    /**
     * 
     * @type jQuery Objeto container que comporta os componentes
     */
    var pai;

    /**
     * 
     * @type {object} Objeto contendo as definições padrão de execução do plugin
     */
    var options = {
        container: $(seletor).closest(".buscacep-container"),
        trigger: {
            seletor: $(this),
            event: "change"
        },
        onLoad: {
            class: "disabled",
            target: $(this)
        },
        events: {
            onStart: function (cep) {},
            onLoad: function (data) {},
            onEnd: function () {},
            onError: function (error) {}
        },
        targets: {}
    };

    /* Definindo as configurações de execução */
    if (config !== undefined) {
        /* Verificando se foi informado um container pai */
        if (config.container !== undefined) {
            options.container = config.container;
        }
        
        /* Verificando se foram informadas configurações relacionadas ao componente de gatilho */
        if (config.trigger !== undefined) {
            if (config.trigger.seletor !== undefined) {
                options.trigger.seletor = config.trigger.seletor;
            }
            if (config.trigger.event !== undefined) {
                options.trigger.event = config.trigger.event;
            }
        }
        
        /* Definindo as configurações relacionadas a edição em tempo real do componente */
        if (config.onLoad !== undefined) {
            if (config.onLoad.class !== undefined) {
                options.onLoad.class = config.onLoad.class;
            }
            if (config.onLoad.target !== undefined) {
                options.onLoad.target = config.onLoad.target;
            }
        }
        
        /* Atribuindo os eventos de início e fim da execução */
        if (config.events !== undefined) {
            if (typeof (config.events.onStart) === "function") {
                options.events.onStart = config.events.onStart;
            }
            if (typeof (config.events.onLoad) === "function") {
                options.events.onLoad = config.events.onLoad;
            }
            if (typeof (config.events.onEnd) === "function") {
                options.events.onEnd = config.events.onEnd;
            }
            if (typeof (config.events.onError) === "function") {
                options.events.onError = config.events.onError;
            }
        }
    }
    
    /* Definindo o container pai da busca */
    pai = $(options.container);
    if (!pai.length) {
        /* Caso a classe container não exista */
        pai = $("body");
    }
    
    options.targets = {
        logradouro: pai.find(".buscacep-logradouro"),
        bairro: pai.find(".buscacep-bairro"),
        cidade: pai.find(".buscacep-cidade"),
        estado: pai.find(".buscacep-estado")
    };
    
    /* Definindo a segunda parte das atribuições */
    if (config !== undefined) {
        /* Verificando se foram definidos alvos fora do container */
        if (config.targets !== undefined) {
            if (config.targets.logradouro !== undefined) {
                options.targets.logradouro = config.targets.logradouro;
            }
            if (config.targets.bairro !== undefined) {
                options.targets.bairro = config.targets.bairro;
            }
            if (config.targets.cidade !== undefined) {
                options.targets.cidade = config.targets.cidade;
            }
            if (config.targets.estado !== undefined) {
                options.targets.estado = config.targets.estado;
            }
        }
    }

    /* Definindo o evento */
    $(options.trigger.seletor).on(options.trigger.event, function () {
        /**/
        var cep = $(seletor).val().replace(/[^\d]+/g, '');        
        if (cep.length === 8 && !buscando) {
            buscando = false;
            $(options.onLoad.target).addClass(options.onLoad.class);
            options.events.onStart(cep);
            /* Realizando a busca */
            $.getJSON(api + cep).done(function (resposta) {
                options.events.onLoad(resposta);
                if (
                        typeof (resposta) === "object" &&
                        Object.keys(resposta).length > 0
                    ) {
                    /* A resposta é válida, preenche os dados */
                    $(options.targets.logradouro).val(resposta.logradouro);
                    $(options.targets.bairro).val(resposta.bairro);
                    $(options.targets.cidade).val(resposta.cidade);
                    $(options.targets.estado).val(resposta.estado);
                } else {
                    options.events.onError(resposta);
                }
                buscando = false;
                $(options.onLoad.target).removeClass(options.onLoad.class);
                options.events.onEnd();
            }).fail(function (error) {
                buscando = false;
                $(options.onLoad.target).removeClass(options.onLoad.class);
                options.events.onError(error);
            });
        }
    });
};