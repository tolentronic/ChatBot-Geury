const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente','next']).addAnswer(['Gracias por utilizar la prueba del ChatBot de Geury'])

const flowweb = addKeyword(['web', 'Página', 'pagina']).addAnswer(
    [
        '  💻 para conocer nuestros serviciosweb visitar https://tolentronic.com.',
        'Escribir *Siguiente* para el paso final',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowbot = addKeyword(['bot', 'chatbot']).addAnswer(
    [
        '  🤖 Aquí te dejo un ejemplo https://bot-whatsapp.netlify.app/docs/example/.',
        'Escribir *Siguiente* para el paso final',
    ],
    null,
    null,
    [flowSecundario]
)

const flowapp = addKeyword(['app','aplicacion','Aplicación']).addAnswer(
    [' 📲  Aquí se ubicará la informacion sobre aplicaciones.',
        'Escribir *Siguiente* para el paso final'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['fuego90'])
    .addAnswer('🙌 Hola bienvenido al *Chatbot* de geury')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre los servicios',
            '👉 Escribe *web* para las informaciones acerca de desarrollo de páginas web',
            '👉 Escribe *bot*  para informaciones del ChatBot de WhatsApp',
            '👉 Escribe *app* para informaciones acerca de desarrollo de app móviles ',
        ],
        null,
        null,
        [flowweb, flowbot, flowTuto, flowapp]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({port:4001})
}

main()
