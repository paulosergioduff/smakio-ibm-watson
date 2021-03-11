// Início das configurações IBM Watson API

const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
require("dotenv").config();
//send

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.KEY_WATSON,
  }),
  serviceUrl: process.env.URL_WATSON,
});

// Fim das configurações IBM Watson API

const gravandoAudio = async function ($texto, $arquivo){

  let parametros = {
      text: $texto,
      accept: 'audio/wav',
      voice: 'pt-BR_IsabelaVoice',
    };

  await textToSpeech.synthesize(parametros)
.then(response => {
  // only necessary for wav formats,
  // otherwise `response.result` can be directly piped to a file
  return textToSpeech.repairWavHeaderStream(response.result);
})
.then(buffer => {
    let arquivo = "./uploads/"+$arquivo+'.wav';
  fs.writeFileSync(arquivo, buffer);
})
.catch(err => {
  console.log('error:', err);
});
};

module.exports = gravandoAudio;

//initVoz("Chutanto o pau da barraca", "sem constante");