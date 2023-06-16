/* require modules */
const { controllers } = require('bapig')

/* auto create adminstrator */
async function createAdmin() {
    try {

        /* verify there if no adminstrator */
        const adminstratorExist = await controllers.validateDocument({ schema: 'user', select: '0767379327', joinForeignKeys: true, documentId: '', validationType: 'onCreate', condition: { phone: '0767379327' } })
        /* confirm there is no adminstrator */
        if (!adminstratorExist.success) {
            /* create new adminstrator */
            const adminstratorCreated = await controllers.createDocumentFieldEncryption({
                schema: 'user',
                fieldToEncrypt: 'password',
                documentData: {
                    password: 'saGma@2021',
                    name: 'Sebastian Ibrahim Lugome'.toLocaleLowerCase(),
                    phone: '0767379327',
                    role: 'admin',
                    location: {
                        Region: 'Mbeya',
                        District: "Mbeya Mjini"
                    },
                    email: "services@mocos.repair",
                    service: 'null',
                    code: '567894',
                    status: true,
                    description: "null",
                    payment: 'null',
                    fee: 'null',
                    paid: 'null',
                    remain: 'null'
                },
            })
            /* confirm adminstator has been created */
            if (adminstratorCreated.success)
                console.log(`Adminstrator has been created.`)
            else
                console.log(`Adminstrator account already exist.`)

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