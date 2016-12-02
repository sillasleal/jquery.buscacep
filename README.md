# jquery.buscacep
Plugin JQuery para a busca de ceps. Utiliza a API http://api.postmon.com.br/v1/cep para as consultas.

## Como instalar:

```bash
bower install jquery.nuscacep
```

## Como usar:

### Sem informar configurações

Após a busca os dados serão inseridos nos componentes filhos do container ".buscacep-container". Este container é pai do input ".buscacep-cep" responsável por receber o cep a ser buscado.

```javascript
$("input_ou_text_para_a_busca").buscacep();
```

```html
<div class="buscacep-container">
    <div>
        <label>CEP</label>
        <input class="buscacep-cep" type="text"/>
    </div>
    <div>
        <label>LOGRADOURO</label>
        <input class="buscacep-logradouro" type="text"/>
    </div>
    <div>
        <label>BAIRRO</label>
        <input class="buscacep-bairro" type="text"/>
    </div>
    <div>
        <label>CIDADE</label>
        <input class="buscacep-cidade" type="text"/>
    </div>
    <div>
        <label>ESTADO</label>
        <input class="buscacep-estado" type="text"/>
    </div>
</div>
```

As classes dos componentes filhos do container que receberão os dados recebidos são:

```css
.buscacep-cep        /* Componente que recebe o cep para a busca */
.buscacep-logradouro /* Componente que recebe a rua(logradouro) */
.buscacep-bairro     /* Componente que recebe o bairro */
.buscacep-cidade     /* Componente que recebe a cidade */
.buscacep-estado     /* Componente que recebe o estado(uf) */
```

### Passando as configurações:

```javascript
    var options = {
        container: $(".container"),
        trigger: { //Definindo o evento como click em um botão especifico.
            seletor: ".buscar",
            event: "click"
        },
        onLoad: { //Definindo que o botão receberá a classe "disabled" durante a execução.
            class: "disabled",
            target: ".buscar"
        },
        events: {
            onStart: function (cep) {
                console.log("Buscando o cep " + cep);
            },
            onLoad: function (data) {
                console.log(data);
            },
            onEnd: function () {
                console.log("Busca concluída");
            },
            onError: function (msg, error) {
                console.log(msg + error);
            }
        },
        targets: {//Alterando os alvos padrão para alvos específicos.
            logradouro: ".logradouro",
            bairro: ".bairro",
            cidade: ".cidade",
            estado: $(".estado")
        }
    };

    $(".cep").buscacep(options);
```
```html
<div class="container">
    <div>
        <label>CEP</label>
        <input class="cep" type="text"/>
        <button class="buscar">BUSCAR</button>
    </div>
    <div>
        <label>LOGRADOURO</label>
        <input class="logradouro" type="text"/>
    </div>
    <div>
        <label>BAIRRO</label>
        <input class="bairro" type="text"/>
    </div>
    <div>
        <label>CIDADE</label>
        <input class="cidade" type="text"/>
    </div>
    <div>
        <label>ESTADO</label>
        <input class="estado" type="text"/>
    </div>
</div>
```

#### Opçoes:

```javascript
$(".cep").buscacep(options);
```
* [options] - Objeto contendo as configurações da busca.
    * [container] - String ou seletor DOM contendo o container pai dos itens alvo da busca. Por padrão é usada a classe "buscacep-container".
    * [trigger]   - Objeto que aciona o evento de busca de cep.
        * [seletor]    - O componente que irá iniciar a busca. Por padrão, a busca é inciada quando o cep estiver completo.
        * [event]      - O evento que serve como gatilho do componente do seletor para iniciar a busca.
    * [onLoad]    - Objeto contendo o componente que será alterado durante a busca.
        * [target]     - O componente que receberá a classe definida em options.onLoad.class . A classe é removida após o termino da busca. O componente padrão é o componente de cep usado na busca.
        * [class]      - A classe que será adicionada ao componente alvo. A classe padrão é "disabled".
    * [events]    - Eventos iniciados durante a execução da busca.
        * [onStart]    - Função executada ao iniciar da busca. Recebe como argumento o cep enviado para a busca. Só é executada quando houver um cep válido no componente cep.
        * [onLoad]     - Função executada quando for recebida a resposta do servidor. Recebe os dados retornados pelo servidor.
        * [onEnd]      - Função executada ao termino da busca.
        * [onError]    - Função executada caso ocorra algum erro na busca. Recebe como parametros a mensagem de erro e o objeto retornado pelo erro.
    * [targets]   - Objeto contendo os componentes que irão receber os dados retornados. Podem ser Strings ou objetos DOM.
        * [logradouro] - O componente que irá receber a rua(logradouro).
        * [bairro]     - O componente que irá receber o bairro.
        * [cidade]     - O componente que irá receber a cidade.
        * [estado]     - O componente que irá receber o estado. É retornada apenas a sigla do estado.