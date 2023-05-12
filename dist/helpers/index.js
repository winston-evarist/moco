/* require modules */
const { controllers } = require('bapig')

/* auto create adminstrator */
async function createAdmin() {
    try {

        /* verify there if no adminstrator */
        const adminstratorExist = await controllers.validateDocument({ schema: 'user', validationType: 'onCreate', condition: { phone: '0767379327' } })
        /* confirm there is no adminstrator */
        if (!adminstratorExist.success) {
            /* create new adminstrator */
            const adminstratorCreated = await controllers.createDocumentFieldEncryption({
                schema: 'user',
                fieldToEncrypt: 'password',
                documentData: {
                    password: 'saGma@2021',
                    name: 'Sebastian Ibrahim Lugome',
                    phone: '0767379327',
                    role: 'admin',
                    location: "Jua Kali - Tanzania"
                },
            })
            /* confirm adminstator has been created */
            if (adminstratorCreated.success)
                console.log(`Adminstrator has been created.`, adminstratorCreated)
            else
                console.log(`Failed to create adminstrator account: ${adminstratorCreated.message}.`)

        }
        else console.log(`Adminstrator already exist on the database`)

    } catch (error) {
        console.log(`Failed to create adminstrator, Error: ${error.message}.`)
    }
}

/* export create administrator function for global accessibility */
module.exports = {
    createAdmin
}