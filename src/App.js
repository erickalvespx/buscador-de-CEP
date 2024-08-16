//bloco de importações do código!
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import "./style.css";
import api from './services/api';

//foi utilizada uma função asycrona para caso de demora!
function App() {
  const [input, setInput] = useState(''); //pesquisar oq significa useState
  const [cep, setCEP] = useState({});  

  async function handleSearch() {

    //verificação de usuário, se ele tiver digitado o cep na tela  
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    //se tudo der certo a função try será inicializada!
    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
    }//caso o CEP não existir ou não estiver correto o catch irá rodar
    catch{
      alert("Erro ao buscar o CEP!")
      setInput("")
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador CEP</h1>

        <div className='containerInput'>
          <input 
      
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput (e.target.value)} //pesquisar sobre oq é onChange!
          />
          
          
          <button className="buttonSearch" onClick={handleSearch}> 
            <FiSearch size={25} color="#FFF"/>
          </button> 
          
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
    </div>
  );
}

export default App;
