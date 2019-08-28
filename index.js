const restify = require('restify') // importando o pacote. 
const mongoose = require('mongoose') 

mongoose.connect('mongodb+srv://escolaapi:escolaapi@escola-api-ugugm.mongodb.net/test?retryWrites=true&w=majority')
        .then(_=>{
        const server =  restify.createServer({ // Criando o servidor para a porta que iremos ouvir as requisições
            name: 'my-rest-api',
            version: '1.0.0',
            ignoreTrailingSlash: truesw
        })

        server.use(restify.plugins.bodyParser())
        
        const alunoSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            }
        })
        
        const Aluno = mongoose.model('Aluno', alunoSchema)

        server.get('/alunos', (req, resp, next) => {
            Aluno.find().then(alunos=>{
                resp.json(alunos)
                return next()
            })
        })
        
        server.get('/alunos/:id', (req, resp, next) => {
            Aluno.findById(req.params.id).then(aluno=>{
                if(aluno){
                    resp.json(aluno)
                } else {
                    resp.status(404)
                    resp.json({message: 'not found'})
                }
                return next()
            })   
        })

        server.post('/alunos', (req, resp, next)=>{
            let aluno = new Aluno(req.body)
            aluno.save().then(aluno=>{
                resp.json(aluno)
            }).catch(erros => {
                resp.status(404)
                resp.json({message: error.message})
            })
        })
        
        server.listen(3000, ()=>{
            console.log('api listening on 3000')
        }) 
        
    }).catch(console.error)

