const knex=require ('knex')
const config=require ('./knexfile')
const db=knex(config)
module.exports=db

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);